"use client";
import { useState } from "react";
import { Button } from "./ui/button"; // Assuming Button is in the ui folder

export const FileUploadButton = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  // File input handler
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  // Simulate click on hidden file input
  const triggerFileInput = () => {
    document.getElementById("video-upload")?.click();
  };

  return (
    <div>
      {/* Hidden file input */}
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleVideoUpload} 
        className="hidden"
        id="video-upload"
      />

      {/* Button styled to trigger file upload */}
      <Button onClick={triggerFileInput} variant="default" size="default">
        Upload Video
      </Button>

      {/* Display video if a file has been uploaded */}
      {videoURL && <video src={videoURL} controls className="w-full mt-4" />}
    </div>
  );
};


// "use client";
// import { useState } from 'react';
// import { Button } from './ui/button';

// export const FileUploadButton = () => {
//   const [videoURL, setVideoURL] = useState<string | null>(null);

//   const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setVideoURL(url);
//     }
//   };

//   return (
//     <div>
//       <input 
//         type="file" 
//         accept="video/*" 
//         onChange={handleVideoUpload} 
//         className="hidden"
//         id="video-upload"
//       />
//       {/* <label htmlFor="video-upload" className="btn-upload">Upload Video</label> */}

//       <label htmlFor="video-upload">
//         <Button variant="default" size="default">Upload Video</Button>
//       </label>

//       {videoURL && <video src={videoURL} controls className="w-full mt-4" />}
//     </div>
//   );
// };
