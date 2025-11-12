import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { signIn, signOut } = useAuthActions();
  const isAuthenticated = useQuery(api.auth.isAuthenticated)
  console.log(isAuthenticated)
  return (
    <div className="p-4">
      {!isAuthenticated ? <Button onClick={() => void signIn("google")}>Sign in with Google</Button> : <Button onClick={() => void signOut()}>Signout</Button>}
    </div>
  )
}
