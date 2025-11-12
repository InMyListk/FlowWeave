import { createFileRoute } from '@tanstack/react-router'
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
      <AuthLoading>
        <p>Still loading</p>
      </AuthLoading>
    </main>
  )
}

function Content() {
  const messages = useQuery(api.auth.isAuthenticated);
  return <div>Authenticated content: {messages}</div>;
}