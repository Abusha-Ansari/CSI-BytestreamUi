import { useEffect, useRef } from "react";

interface FullscreenVideoProps {
  onVideoEnd: () => void;
}

export default function FullscreenVideo({ onVideoEnd }: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Autoplay failed:", error);
      });

      // Stop video after 6 seconds
      const timer = setTimeout(() => {
        video.pause();
        onVideoEnd();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [onVideoEnd]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/LandingPageVideo.mp4" // Ensure correct path
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}
