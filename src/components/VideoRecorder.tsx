"use client";
import { useState, useRef } from 'react';
import { Button } from './ui/button';

export const VideoRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) recordedChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/mp4' });
      setVideoURL(URL.createObjectURL(blob));
      recordedChunks.current = [];
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div>

      <Button onClick={recording ? stopRecording : startRecording} className="btn-record">
        {recording ? 'Stop Recording' : 'Record Video'}
      </Button>

      {videoURL && <video src={videoURL} controls className="w-full mt-4" />}
    </div>
  );
};
