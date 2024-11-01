'use client'
import { useRef, useEffect } from 'react'
import { Button } from './ui/button'

export const VideoRecorder = ({
  setVideoURL,
  videoRef,
  isRecording,
  setIsRecording,
}: {
  setVideoURL: (url: string) => void
  videoRef: React.RefObject<HTMLVideoElement>
  isRecording: boolean
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const recordedChunks = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Get new media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      streamRef.current = stream

      // Set the video element's srcObject for live preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current
          .play()
          .catch((e) => console.log('Play error:', e))
      }

      // Initialize MediaRecorder with the stream
      mediaRecorder.current = new MediaRecorder(stream)
      recordedChunks.current = []

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data)
        }
      }

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)
        setVideoURL(url)

        // Clear the live preview
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }
      }

      mediaRecorder.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div>
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        variant={isRecording ? 'destructive' : 'default'}
        className="btn-record"
      >
        {isRecording ? 'Stop Recording' : 'Record Video'}
      </Button>
    </div>
  )
}
