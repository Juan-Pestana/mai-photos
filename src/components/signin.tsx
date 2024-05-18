import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from '@/auth/auth'
import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'

export async function SignInForm() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }
  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email to access your account.
        </p>
      </div>
      <form
        className="space-y-4"
        action={async (formData) => {
          'use server'
          await signIn('resend', formData, { callbackUrl: '/' })
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Type your email"
            required
            type="email"
          />
        </div>
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  )
}
