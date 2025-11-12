import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL

if (!CONVEX_URL) {
  console.error('missing envar CONVEX_URL')
}
const convex = new ConvexReactClient(CONVEX_URL);

const publishableKey = (import.meta as any).env.VITE_CLERK_PUBLISHABLE_KEY

export default function AppConvexProvider({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
