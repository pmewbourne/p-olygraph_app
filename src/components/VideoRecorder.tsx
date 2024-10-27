'use client'
import { useState, useRef } from 'react'
import { Button } from './ui/button'

export const VideoRecorder = () => {
  const [recording, setRecording] = useState(false)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const recordedChunks = useRef<Blob[]>([])
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startRecording = async () => {
    // Request both audio and video streams
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })

    // Set the stream to the video element for live preview
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }

    // Initialize MediaRecorder with both audio and video
    mediaRecorder.current = new MediaRecorder(stream)

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.current.push(event.data)
    }

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/mp4' })
      setVideoURL(URL.createObjectURL(blob))
      recordedChunks.current = []
      // Stop the stream when recording ends
      stream.getTracks().forEach((track) => track.stop())
    }

    mediaRecorder.current.start()
    setRecording(true)
  }

  const stopRecording = () => {
    mediaRecorder.current?.stop()
    setRecording(false)
  }

  return (
    <div>
      <Button
        onClick={recording ? stopRecording : startRecording}
        className="btn-record"
      >
        {recording ? 'Stop Recording' : 'Record Video'}
      </Button>

      {/* Live preview while recording */}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="mt-4 w-full border border-gray-300"
          style={{ display: recording ? 'block' : 'none' }}
        />
      </div>

      {/* Playback of the recorded video */}
      {videoURL && !recording && (
        <video src={videoURL} controls className="mt-4 w-full" />
      )}
    </div>
  )
}
