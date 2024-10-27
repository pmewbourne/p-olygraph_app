import AuthButton from '@/components/AuthButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import { createServerClient } from '@/utils/supabase'
import ThemeToggle from '@/components/ThemeToggle'
import React from 'react';
import { FileUploadButton } from '../components/FileUploadButton';
import { VideoRecorder } from '../components/VideoRecorder';
import { Button } from '@/components/ui/button'

export default async function Index() {

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createServerClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
        <Header />
        <main className="flex flex-1 flex-col gap-6">
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div>

      <div className="container mx-auto p-4">
        <div className="flex space-x-4">
          <h1 className="text-2xl font-bold mb-4">Video Upload and Recorder</h1>
            <FileUploadButton />
            <VideoRecorder />
        </div>
      </div>

      <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
        <p className="mb-6">
          Powered by{' '}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
        <ThemeToggle />
      </footer>
    </div>
  )
}

// "use client";
// import AuthButton from '@/components/AuthButton'
// import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
// import SignUpUserSteps from '@/components/SignUpUserSteps'
// import Header from '@/components/Header'
// import { cookies } from 'next/headers'
// import { createServerClient } from '@/utils/supabase'
// import ThemeToggle from '@/components/ThemeToggle'
// import React from 'react';
// import { FileUploadButton } from '../components/FileUploadButton';
// import { VideoRecorder } from '../components/VideoRecorder';
// import { Button } from '@/components/ui/button';


// export default async function Index() {
//   const cookieStore = cookies()

//   const canInitSupabaseClient = () => {
//     try {
//       createServerClient(cookieStore)
//       return true
//     } catch (e) {
//       return false
//     }
//   }

//   const isSupabaseConnected = canInitSupabaseClient()

//   // Handler to trigger file upload
//   const handleUploadClick = () => {
//     // Assuming FileUploadButton is a component that handles the upload
//     document.getElementById('file-upload-button')?.click()
//   }

//   // Handler to trigger video recording
//   const handleRecordClick = () => {
//     // Assuming VideoRecorder component has functionality to start recording
//     document.getElementById('video-recorder')?.click()
//   }

//   return (
//     <div className="flex w-full flex-1 flex-col items-center gap-20">
//       <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
//         <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
//           {isSupabaseConnected && <AuthButton />}
//         </div>
//       </nav>

//       <div className="flex max-w-4xl flex-1 flex-col gap-20 px-3">
//         <Header />
//         <main className="flex flex-1 flex-col gap-6">
//           <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
//           {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
//         </main>
//       </div>

//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Video Upload and Recorder</h1>
          
//           {/* Add buttons for upload and record functionality */}
//           <div className="flex space-x-4 mb-4">
//             <Button onClick={handleUploadClick} variant="default" size="lg">
//               Upload Video
//             </Button>
//             <Button onClick={handleRecordClick} variant="default" size="lg">
//               Record Video
//             </Button>
//           </div>

//           {/* Hidden components (for functionality) */}
//           <div id="file-upload-button">
//             <FileUploadButton />
//           </div>
//           <div id="video-recorder">
//             <VideoRecorder />
//           </div>
//       </div>

//       <footer className="w-full justify-center border-t border-t-foreground/10 p-8 text-center text-xs">
//         <p className="mb-6">
//           Powered by{' '}
//           <a
//             href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//             target="_blank"
//             className="font-bold hover:underline"
//             rel="noreferrer"
//           >
//             Supabase
//           </a>
//         </p>
//         <ThemeToggle />
//       </footer>
//     </div>
//   )
// }
