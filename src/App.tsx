import { useState } from "react";
import FullscreenVideo from "./ownComponents/FullScreenVideo";
import { ParticlesDemo } from "./ownComponents/SparkleHero";
import BytestreamLanding from "./ownComponents/bytestream-landing";

export default function App() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <>
      {!videoEnded && (
        <FullscreenVideo onVideoEnd={() => setVideoEnded(true)} />
      )}

      {videoEnded && (
        <>
          <BytestreamLanding />
          <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <div className="w-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black dark:text-white overflow-hidden">
              <ParticlesDemo heading1={"A New Dimension"} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
