import { useEffect, useState } from "react"

import { Particles } from "@/components/ui/particles"

interface ParticlesDemoProps {
  heading1: string
}

export function ParticlesDemo({heading1}: ParticlesDemoProps) {
  const  theme  = "dark"
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000")
  }, [theme])

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl bg-black">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        {heading1}
      </span>
      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}
