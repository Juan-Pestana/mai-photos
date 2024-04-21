'use client'
import { uploadFile } from '@/actions'
import { useFormState } from 'react-dom'
import SubmitButton from './submitButton'
import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useToast } from '@/components/ui/use-toast'

export const initialState = {
  message: '',
  status: '',
}

export default function UploadForm({ id }: { id?: string }) {
  const [state, formAction] = useFormState(uploadFile, initialState)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null)
  const [imageSize, setImageSize] = useState<string[] | null>(null)
  //Pending SetUp Toast
  const { toast } = useToast()
  console.log(id)
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: 'Success',
        description: `${state.message}`,
        variant: 'default',
      })
      setPreview(null)
    }
    if (state.status === 'error') {
      toast({
        title: 'Whooops...',
        description: `${state.message}`,
        variant: 'destructive',
      })
    }
  }, [state.status])

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader()

    file.onload = function (e) {
      setPreview(file.result)
      //Initiate the JavaScript Image object.
      var image = new Image()

      //Set the Base64 string return from FileReader as source.
      if (typeof file.result === 'string') {
        image.src = file.result
        image.onload = function () {
          setImageSize([`${image.naturalWidth}`, `${image.naturalHeight}`])
        }
      }
    }

    file.readAsDataURL(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
    })

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (typeof acceptedFiles[0] === 'undefined')
      return toast({
        title: 'Please select a Photo to upload',
        variant: 'default',
      })

    const formData = new FormData()

    acceptedFiles.map((file) => {
      formData.append('file', file, file.name)
      if (imageSize) {
        formData.append('width', imageSize[0])
        formData.append('height', imageSize[1])
      }
      if (id) {
        formData.append('userId', id)
      }
    })

    await formAction(formData)
  }

  return (
    <div className="form-wrapper px-2 max-w-screen-lg mx-auto ">
      <form onSubmit={handleOnSubmit}>
        <div
          className="flex items-center justify-center w-full my-5"
          {...getRootProps()}
        >
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF
              </p>
            </div>
            <input
              className="bg-slate-500 p-5"
              {...getInputProps({
                type: 'file',
                name: 'file',
                id: 'file',
                accept: 'images/*',
              })}
            />
          </label>
        </div>
        <SubmitButton />
      </form>

      {preview && (
        <div className="my-5">
          <img className="h-96" src={preview as string} alt="Upload preview" />
        </div>
      )}
    </div>
  )
}
