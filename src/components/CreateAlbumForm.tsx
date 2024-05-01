'use client'

import { createAlbum } from '@/actions'
import { useFormState } from 'react-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'

export const initialState = {
  message: '',
  status: '',
}

function CreateAlbumForm() {
  //@ts-ignore
  const [state, formAction] = useFormState(createAlbum, initialState)
  const [file, setFile] = useState<File | undefined>()
  const [albumName, setAlbumName] = useState<string>('')

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & { files: FileList }
    setFile(target.files[0])
    console.log('acasd')
  }

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (typeof file === 'undefined') return

    const formData = new FormData()

    const fileName = albumName.trim().replace(' ', '_') + file.name

    formData.append('album_cover', file, `cover${fileName}`)
    formData.append('album_name', albumName)

    //@ts-ignore
    await formAction(formData)
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-5 flex flex-col gap-5">
      <div>
        <Label htmlFor="album_name">Album Name</Label>
        <Input
          id="album_name"
          name="album_name"
          placeholder="My Album"
          type="text"
          onChange={(e) => setAlbumName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="picture">Album Cover</Label>
        <Input id="album_cover" type="file" onChange={handleChange} />
      </div>

      <button className="bg-slate-800 text-white py-2 rounded-md" type="submit">
        Create
      </button>
    </form>
  )
}

export default CreateAlbumForm
