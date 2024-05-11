'use client'

export default function SubmitButton({ loading }: { loading: boolean }) {
  //const { pending } = useFormStatus()
  return (
    <button
      className={` ${
        loading ? 'bg-blue-400' : 'bg-blue-500'
      } block rounded-lg text-white py-3 w-full font-bold hover:bg-blue-400 shadow-lg transition-all`}
      type="submit"
      aria-disabled={loading}
    >
      {loading ? 'Uploading...' : 'Submit Image'}
    </button>
  )
}
