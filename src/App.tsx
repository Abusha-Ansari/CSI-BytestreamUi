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
          <div className="h-screen bg-black hover:cursor-pointer">
          <ParticlesDemo heading1={"A New Dimension"} />
          </div>
        </>
      )}
    </>
  );
}
