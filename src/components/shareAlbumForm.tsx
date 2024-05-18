'use client'

import { shareAlbum } from '@/actions/albums'
import { useRef } from 'react'
import { useFormState } from 'react-dom'
export const initialState = {
  message: '',
  status: '',
}

export default function ShareAlbumForm({ albumId }: { albumId: string }) {
  //@ts-ignore
  const [state, formAction] = useFormState(shareAlbum, initialState)
  const inputRef = useRef<HTMLInputElement | null>(null)

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    let email = inputRef.current?.value.trim().toLowerCase()

    const formData = new FormData()

    formData.append('email', email!)
    formData.append('albumId', albumId)

    //@ts-ignore
    await formAction(formData)

    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  }

  return (
    <form className="flex-1 flex gap-2 justify-end " onSubmit={handleOnSubmit}>
      <input
        ref={inputRef}
        className="px-2 py-1 rounded-md border-2 border-slate-300"
        type="text"
        placeholder="friends email"
      />
      <button className="px-3 py-1 rounded-md bg-blue-500 text-white">
        {' '}
        Invite{' '}
      </button>
      {state?.status === 'success' ? (
        <div className="text-sm text-green-700">state.message</div>
      ) : null}
    </form>
  )
}
