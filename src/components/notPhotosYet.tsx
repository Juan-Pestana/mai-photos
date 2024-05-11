/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eDcwAI9mEsI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function NotPhotosYet() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full my-24">
      <div className="bg-gray-100 rounded-full p-4 dark:bg-gray-800">
        <CameraIcon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold">No Photos Yet</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Add your first photos to this album.
        </p>
      </div>
    </div>
  )
}

function CameraIcon(props: any) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
