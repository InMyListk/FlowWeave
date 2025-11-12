import { customQuery, customMutation } from "convex-helpers/server/customFunctions";
import { query, mutation } from "../_generated/server";

// 1. Define the logic to get the user
// We re-use this function for both queries and mutations
async function getUserIdContext(ctx: any, args?: any) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
        throw new Error("Unauthorized: You must be logged in.");
    }

    // Return the NEW context properties we want to add
    return {
        ctx: {
            ...ctx, // Keep the original context (db, scheduler, etc.)
            userId: identity.tokenIdentifier
        },
        args: args, // Pass arguments through unchanged
    };
}

// 2. Create a Public Query (Adds userId if logged in, null if not)
export const protectedQuery = customQuery(query, {
    args: {},
    input: getUserIdContext
});

// 3. Create a Protected Mutation (THROWS error if not logged in)
export const protectedMutation = customMutation(mutation, {
    args: {},
    input: getUserIdContext
});