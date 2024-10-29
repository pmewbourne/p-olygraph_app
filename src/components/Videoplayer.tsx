'use client'
import { useState } from 'react'
import { FileUploadButton } from './FileUploadButton'
import { VideoRecorder } from './VideoRecorder'

export const VideoUploadAndRecorder = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Video Upload and Recorder</h1>
      <div className="mb-4 flex space-x-4">
        <FileUploadButton setVideoURL={setVideoURL} />
        <VideoRecorder setVideoURL={setVideoURL} />
      </div>

      {/* Shared Video Display Area */}
      <div className="mt-4 flex h-64 w-full items-center justify-center rounded border border-gray-400 bg-gray-200">
        {videoURL ? (
          <video src={videoURL} controls className="h-full w-full" />
        ) : (
          <p className="text-gray-500">Your video will appear here</p>
        )}
      </div>
    </div>
  )
}
