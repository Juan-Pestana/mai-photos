'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="block bg-blue-900 rounded-lg text-white py-3 w-full"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Uploading' : 'Submit Image'}
    </button>
  )
}
