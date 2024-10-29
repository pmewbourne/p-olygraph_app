'use client'
import { Button } from './ui/button' // Assuming Button is in the ui folder
import { useState } from 'react'

export const FileUploadButton = ({
  setVideoURL,
}: {
  setVideoURL: (url: string) => void
}) => {
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoURL(url)
    }
  }

  const triggerFileInput = () => {
    document.getElementById('video-upload')?.click()
  }

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
        className="hidden"
        id="video-upload"
      />
      <Button onClick={triggerFileInput} variant="default" size="default">
        Upload Video
      </Button>
    </div>
  )
}

// "use client";
// import { useState } from "react";
// import { Button } from "./ui/button"; // Assuming Button is in the ui folder

// export const FileUploadButton = () => {
//   const [videoURL, setVideoURL] = useState<string | null>(null);

//   // File input handler
//   const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setVideoURL(url);
//     }
//   };

//   // Simulate click on hidden file input
//   const triggerFileInput = () => {
//     document.getElementById("video-upload")?.click();
//   };

//   return (
//     <div>
//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="video/*"
//         onChange={handleVideoUpload}
//         className="hidden"
//         id="video-upload"
//       />

//       {/* Button styled to trigger file upload */}
//       <Button onClick={triggerFileInput} variant="default" size="default">
//         Upload Video
//       </Button>

//       {/* Display video if a file has been uploaded */}
//       {videoURL && <video src={videoURL} controls className="w-full mt-4" />}
//     </div>
//   );
// };
