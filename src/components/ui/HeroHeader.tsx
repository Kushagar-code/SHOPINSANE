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
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-canvas-mist z-10"
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
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-gt-standard font-semibold tracking-tighter text-ink-black leading-[1.05] mb-6">
          Curated Assets <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-shop-violet to-violet-wash">
            For Premium Creators
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-gray max-w-2xl mx-auto font-gt-standard font-normal leading-relaxed tracking-tight">
          Discover exclusive, high-end digital properties designed to elevate your creative workflow and impress your audience instantly.
        </p>
      </motion.div>

      {/* Decorative Bottom Shadow Split */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-canvas-mist to-transparent pointer-events-none" />
    </div>
  )
}
