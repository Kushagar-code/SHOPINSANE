'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Spring options for pillow-soft responsive movement
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 }
  
  const yBg = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '30%']), springConfig)
  const opacityText = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), springConfig)
  const scaleText = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0.95]), springConfig)

  return (
    <div 
      ref={containerRef} 
      className="relative pt-32 pb-4 flex flex-col items-center justify-center overflow-hidden bg-canvas-mist z-10"
    >
      {/* Dynamic Marble Parallax Background */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pure-white via-canvas-mist to-canvas-mist"
      >
        {/* Soft floating background spots */}
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-shop-violet/5 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[25vw] h-[25vw] rounded-full bg-violet-wash/10 blur-[100px]" />
      </motion.div>

      {/* Main Title Constellation */}
      <motion.div 
        style={{ opacity: opacityText, scale: scaleText }}
        className="relative z-10 text-center max-w-5xl px-6 select-none"
      >
        <h1 className="text-[64px] sm:text-[72px] font-gt-standard font-semibold tracking-[-0.05em] text-ink-black leading-[1.05] mb-6">
          Insane Tech. <br className="hidden sm:inline" />
          Zero Compromise.
        </h1>
        <p className="text-[16px] text-muted-gray max-w-2xl mx-auto font-gt-standard font-normal leading-relaxed tracking-[-0.031em]">
          Discover next-generation smartphones, ultra-compact GaN power bricks, and high-fidelity spatial audio. Engineered for those who demand absolute performance.
        </p>
      </motion.div>

      {/* Decorative Bottom Shadow Split */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-canvas-mist to-transparent pointer-events-none" />
    </div>
  )
}
