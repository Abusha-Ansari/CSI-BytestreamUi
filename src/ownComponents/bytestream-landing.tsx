import { useEffect, useState, useRef } from "react"
const inter = { fontFamily: "Inter, sans-serif" };
const orbitron = { fontFamily: "Orbitron, sans-serif", fontWeight: "700" };


const ByteStreamLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 40 })
  const [binaryGrid, setBinaryGrid] = useState<number[][]>([])

  // Generate random binary grid
  useEffect(() => {
    const generateBinaryGrid = () => {
      const rows = Math.ceil(window.innerHeight / 30)
      const cols = Math.ceil(window.innerWidth / 20)

      setGridSize({ rows, cols })

      const newGrid = Array(rows)
        .fill(0)
        .map(() =>
          Array(cols)
            .fill(0)
            .map(() => Math.round(Math.random())),
        )

      setBinaryGrid(newGrid)
    }

    generateBinaryGrid()
    window.addEventListener("resize", generateBinaryGrid)

    return () => {
      window.removeEventListener("resize", generateBinaryGrid)
    }
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Binary background */}
      <div className="absolute inset-0 font-mono text-xl opacity-70">
        {binaryGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row.map((cell, cellIndex) => {
              const cellX = cellIndex * 20
              const cellY = rowIndex * 30

              // Calculate distance from mouse
              const dx = cellX - mousePosition.x
              const dy = cellY - mousePosition.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              // Glow intensity based on distance
              const glowIntensity = Math.max(0, 1 - distance / 200)

              return (

                <span
                  key={`${rowIndex}-${cellIndex}`}
                  className="w-5 h-8 flex items-center justify-center transition-colors duration-300"
                  style={{
                    color:
                      glowIntensity > 0
                        ? `rgba(${cell ? "0, 255, 0" : "0, 200, 255"}, ${glowIntensity})`
                        : "rgba(255, 255, 255, 0.4)",
                    textShadow:
                      glowIntensity > 0
                        ? `0 0 ${glowIntensity * 15}px rgba(${cell ? "0, 255, 0" : "0, 200, 255"}, ${glowIntensity})`
                        : "none",
                  }}
                >
                  {cell}
                </span>
              )
            })}
          </div>
        ))}
      </div>

      {/* Radial glow effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0, 255, 128, 0.3) 0%, rgba(0, 200, 255, 0.1) 40%, rgba(0, 0, 0, 0) 70%)",
          mixBlendMode: "screen",
        }}
      />


      <div className="absolute inset-0 flex items-center justify-center">

        <h1
          className={`${orbitron.className} text-6xl md:text-8xl font-bold tracking-wider text-transparent bg-clip-text`}
          style={{
            backgroundImage: "linear-gradient(135deg, #00ff88 0%, #00a1ff 100%)",
            textShadow: "0 0 15px rgba(0, 255, 128, 0.5), 0 0 30px rgba(0, 200, 255, 0.3)",
          }}
        >
          QUANTAMANIA
        </h1>
      </div>

      {/* Call to action */}

      <div className="absolute bottom-16 left-0 right-0 flex justify-center">
    
        <button
          className={`${inter.className} px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-900/30 transition-all duration-300 font-semibold`}
        >
          Enter the Stream
        </button>
      </div>
    </div>
  )
}


export default ByteStreamLanding


// import React from 'react'

// const bytestream-landing = () => {
//   return (
//     <div>bytestream-landing</div>
//   )
// }

// export default bytestream-landing