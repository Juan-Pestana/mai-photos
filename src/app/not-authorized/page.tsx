/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ViUNLJOVZHy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'

export default function Component() {
  return (
    <main className="flex h-[100dvh] items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mx-4 flex max-w-md flex-col items-center justify-center space-y-6 text-center">
        <LockIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Access Denied
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            You don&apos;t have permission to access this page.
          </p>
        </div>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </main>
  )
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
