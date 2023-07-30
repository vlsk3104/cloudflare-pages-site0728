'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleChange = (e: any) => {
    setFile(e.target.files[0])
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    const ext = file.name.split(".").pop() as string
    formData.append("path", `${uuidv4()}.${ext}`)

    const response = await fetch('/api/file', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json()

    setImageUrl(data.url)
  }

  return (
    <>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select file:</label>
          <input type="file" name="file" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
      <div>
      {imageUrl && <img src={imageUrl} alt="Uploaded content" />}
      </div>
    </>
  );
}
