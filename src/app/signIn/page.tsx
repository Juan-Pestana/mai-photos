import { signIn } from '@/auth/auth'
import { SignIn } from '@/components/signin'
import { auth, signOut } from '@/auth/auth'

export default async function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SignIn />
    </main>
  )
}
