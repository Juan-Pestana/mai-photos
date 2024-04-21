'use client'
import React from 'react'
import UploadForm from '@/components/UploadForm'

export default function testComponents() {
  return (
    <>
      <h1 className="text-4xl py-10 text-center">Upload Images to S3</h1>
      <UploadForm />
    </>
  )
}
