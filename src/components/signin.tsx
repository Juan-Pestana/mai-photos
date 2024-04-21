import { signIn } from '@/auth/auth'
import { auth, signOut } from '@/auth/auth'
import { redirect } from 'next/navigation'

export async function SignIn() {
  const session = await auth()

  if (session) {
    return redirect('/')
  }

  return (
    <>
      <div className="my-auto flex items-center justify-center p-5 bg-slate-300 rounded-md">
        <form
          className="flex flex-col gap-5 "
          action={async (formData) => {
            'use server'
            await signIn('resend', formData, { callbackUrl: '/' })
          }}
        >
          <input
            className="text-black p-2 rounded-md text-center"
            type="text"
            name="email"
            placeholder="Type your email"
          />
          <button className="px-4 py-2 bg-slate-500 rounded-md" type="submit">
            SignIn to Mai-Photos
          </button>
        </form>
      </div>
    </>
  )
}
