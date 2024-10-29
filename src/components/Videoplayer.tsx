'use client'
import { useState, useRef } from 'react'
import { FileUploadButton } from './FileUploadButton'
import { VideoRecorder } from './VideoRecorder'

export const VideoUploadAndRecorder = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Video Upload and Recorder</h1>
      <div className="mb-4 flex space-x-4">
        <FileUploadButton setVideoURL={setVideoURL} />
        <VideoRecorder
          setVideoURL={setVideoURL}
          videoRef={videoRef} // Pass videoRef for live preview
          setIsRecording={setIsRecording} // Track recording state
        />
      </div>

      {/* Shared Video Display Area */}
      <div className="mt-4 flex h-[480px] w-[640px] items-center justify-center rounded border border-gray-400 bg-gray-200">
        {isRecording ? (
          // Live preview while recording
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full"
          />
        ) : videoURL ? (
          // Playback recorded video
          <video src={videoURL} controls className="h-full w-full" />
        ) : (
          <p className="text-gray-500">Your video will appear here</p>
        )}
      </div>
    </div>
  )
}

// 'use client'
// import { useState, useRef } from 'react'
// import { Button } from './ui/button'
// import { VideoRecorder } from './VideoRecorder'
// import { FileUploadButton } from './FileUploadButton'

// export const VideoUploadAndRecorder = () => {
//   const [videoURL, setVideoURL] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   return (
//     <div>
//       <h1 className="mb-4 text-2xl font-bold">Video Upload and Recorder</h1>
//       <div className="mb-4 flex space-x-4">
//         <FileUploadButton setVideoURL={setVideoURL} />
//         <VideoRecorder
//           setVideoURL={setVideoURL}
//           videoRef={videoRef} // Pass videoRef for live preview
//           setIsRecording={setIsRecording} // Track recording state
//         />
//       </div>

//       {/* Shared Video Display Area */}
//       <div className="mt-4 flex h-[480px] w-[640px] items-center justify-center rounded border border-gray-400 bg-gray-200">
//         {isRecording ? (
//           // Live preview while recording
//           <video ref={videoRef} autoPlay muted className="h-full w-full" />
//         ) : videoURL ? (
//           // Playback recorded video
//           <video src={videoURL} controls className="h-full w-full" />
//         ) : (
//           <p className="text-gray-500">Your video will appear here</p>
//         )}
//       </div>
//     </div>
//   )
// }

// 'use client'
// import { useState } from 'react'
// import { FileUploadButton } from './FileUploadButton'
// import { VideoRecorder } from './VideoRecorder'

// export const VideoUploadAndRecorder = () => {
//   const [videoURL, setVideoURL] = useState<string | null>(null)

//   return (
//     <div>
//       <h1 className="mb-4 text-2xl font-bold">Video Upload and Recorder</h1>
//       <div className="mb-4 flex space-x-4">
//         <FileUploadButton setVideoURL={setVideoURL} />
//         <VideoRecorder setVideoURL={setVideoURL} />
//       </div>

//       {/* Shared Video Display Area */}
//       <div className="mt-4 flex h-[480px] w-[640px] items-center justify-center rounded border border-gray-400 bg-gray-200">
//         {videoURL ? (
//           <video src={videoURL} controls className="h-full w-full object-contain" />
//         ) : (
//           <p className="text-gray-500">Your video will appear here</p>
//         )}
//       </div>
//     </div>
//   )
// }
