'use client'

import { createAlbum } from '@/actions/albums'
import { useFormState } from 'react-dom'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'

export const initialState = {
  message: '',
  status: '',
}

function CreateAlbumForm() {
  //@ts-ignore
  const [state, formAction] = useFormState(createAlbum, initialState)
  const [pending, setPending] = useState<boolean>(false)
  const [file, setFile] = useState<File | undefined>()
  const [albumName, setAlbumName] = useState<string>('')
  const [albumDescription, setAlbumDescription] = useState<string>('')
  const router = useRouter()

  const { toast } = useToast()

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & { files: FileList }
    setFile(target.files[0])
  }

  useEffect(() => {
    if (state.status !== '') {
      setPending(false)
      toast({
        title: state.message,
      })
      router.push('/')
    }
  }, [state.status])

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setPending(true)

    const formData = new FormData()

    if (file?.name) {
      const name = `${Date.now()}${file.name}`
      const fileName = albumName.trim().replace(' ', '_') + name
      const cleanName = encodeURI(fileName)
      const res = await fetch(`/api/signedUrl?name=${cleanName}&type=covers`)
      const urlResponse = await res.json()
      const uploadFiles = await fetch(urlResponse.url, {
        method: 'PUT',
        body: file,
      })

      console.log(uploadFiles)
      if (uploadFiles.ok) {
        formData.append('album_cover', `${cleanName}`)
      } else {
        toast({
          title: 'Cover fail to upload',
        })
      }
    }

    formData.append('album_name', albumName)
    formData.append('album_description', albumDescription)

    //@ts-ignore
    await formAction(formData)
  }

  return (
    <form onSubmit={handleOnSubmit} className="mt-5 flex flex-col gap-7">
      <div className="mt-6">
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
        <Label htmlFor="album_description">Album Description</Label>
        <Input
          id="album_description"
          name="album_description"
          placeholder="Coolest trip ever"
          type="text"
          onChange={(e) => setAlbumDescription(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="picture">Album Cover</Label>
        <Input id="album_cover" type="file" onChange={handleChange} />
      </div>

      <button
        className={` ${
          pending ? 'bg-slate-500' : 'bg-slate-800'
        } text-white py-2 rounded-md `}
        type="submit"
        aria-disabled={pending}
      >
        {pending ? 'Creating...' : 'Create Album'}
      </button>
    </form>
  )
}

export default CreateAlbumForm
