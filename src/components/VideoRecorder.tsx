'use client'
import { useState, useRef } from 'react'
import { Button } from './ui/button'

export const VideoRecorder = ({
  setVideoURL: updateParentVideoURL,
  videoRef,
  setIsRecording,
}: {
  setVideoURL: (url: string) => void
  videoRef: React.RefObject<HTMLVideoElement>
  setIsRecording: (isRecording: boolean) => void
}) => {
  const [localVideoURL, setLocalVideoURL] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const recordedChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }

    mediaRecorder.current = new MediaRecorder(stream)

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.current.push(event.data)
    }

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)
      setLocalVideoURL(url)
      updateParentVideoURL(url)
      recordedChunks.current = []
    }

    mediaRecorder.current.start()
    setRecording(true)
    setIsRecording(true)
  }

  const stopRecording = () => {
    mediaRecorder.current?.stop()
    setRecording(false)
    setIsRecording(false)
  }

  return (
    <div>
      <Button
        onClick={recording ? stopRecording : startRecording}
        className="btn-record"
      >
        {recording ? 'Stop Recording' : 'Record Video'}
      </Button>
    </div>
  )
}

// 'use client'
// import { useState, useRef } from 'react'
// import { Button } from './ui/button'

// export const VideoRecorder = ({
//   setVideoURL: updateParentVideoURL,
// }: {
//   setVideoURL: (url: string) => void
// }) => {
//   const [recording, setRecording] = useState(false)
//   const [localVideoURL, setLocalVideoURL] = useState<string | null>(null)
//   const mediaRecorder = useRef<MediaRecorder | null>(null)
//   const recordedChunks = useRef<Blob[]>([])
//   const videoRef = useRef<HTMLVideoElement | null>(null)

//   const startRecording = async () => {
//     // Request both audio and video streams
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     })

//     // Set the stream to the video element for live preview
//     if (videoRef.current) {
//       videoRef.current.srcObject = stream
//     }

//     // Initialize MediaRecorder with both audio and video
//     mediaRecorder.current = new MediaRecorder(stream)

//     mediaRecorder.current.ondataavailable = (event) => {
//       if (event.data.size > 0) recordedChunks.current.push(event.data)
//     }

//     mediaRecorder.current.onstop = () => {
//       const blob = new Blob(recordedChunks.current, { type: 'video/mp4' })
//       const url = URL.createObjectURL(blob)
//       setLocalVideoURL(url) // Set the local URL for playback
//       updateParentVideoURL(url) // Update the parent component's state
//       recordedChunks.current = []
//     }

//     mediaRecorder.current.start()
//     setRecording(true)
//   }

//   const stopRecording = () => {
//     mediaRecorder.current?.stop()
//     setRecording(false)
//   }

//   return (
//     <div>
//       <Button
//         onClick={recording ? stopRecording : startRecording}
//         className="btn-record"
//       >
//         {recording ? 'Stop Recording' : 'Record Video'}
//       </Button>

//       {/* Live preview while recording */}
//       <div className="video-container">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           className="mt-4 w-full border border-gray-300"
//           style={{ display: recording ? 'block' : 'none' }}
//         />
//       </div>

//       {/* Playback of the recorded video */}
//       {/* {localVideoURL && !recording && (
//         <video src={localVideoURL} controls className="mt-4 w-full" />
//       )} */}
//     </div>
//   )
// }
