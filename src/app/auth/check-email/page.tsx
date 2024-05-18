import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Check Your Email
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We&apos;ve sent an authentication link to your email address. Please
          check your inbox and click the link to verify your account.
        </p>
      </div>
      <div>
        <div>
          <Image
            src="/email-sent.gif"
            alt="email sent image"
            width={496}
            height={276}
          />
        </div>
        {/* <Link
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          href="#"
        >
          Open Email Inbox
        </Link> */}
      </div>
    </div>
  )
}
