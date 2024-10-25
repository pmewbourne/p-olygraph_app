"use client";
import { useState } from 'react';

export const FileUploadButton = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleVideoUpload} 
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload" className="btn-upload">Upload Video</label>

      {videoURL && <video src={videoURL} controls className="w-full mt-4" />}
    </div>
  );
};
