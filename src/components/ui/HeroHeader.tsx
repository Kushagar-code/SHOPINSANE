'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Smooth parallax scroll effects
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.96])

  // Staggered load animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const // Brutalist high-energy snap easeOutExpo
      }
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#e5e5e5] overflow-hidden z-10 pt-32 pb-[80px]"
    >
      {/* Subtle Grid Parallax Overlay */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      <motion.div 
        style={{ opacity: opacityHero, scale: scaleHero }}
        className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10"
      >
        {/* Left Column - Massive Editorial Typography */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col text-left space-y-6"
        >
          {/* Monospace Mint Tag Pill */}
          <motion.div 
            variants={itemVariants}
            className="px-3.5 py-1 bg-[#d1ffca] text-[#000000] rounded-[64px] font-mono text-[12px] font-bold tracking-wider uppercase w-fit"
          >
            NEW ARRIVALS 2026
          </motion.div>

          {/* Massive Display Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-8xl lg:text-[110px] xl:text-[120px] font-black tracking-tighter leading-[0.9] text-ink-black uppercase"
          >
            INSANE TECH<span className="text-[#fff100] font-gt-standard font-black">.</span> <br />
            ZERO COMPROMISE.
          </motion.h1>

          {/* Muted Brutalist Subtext */}
          <motion.p 
            variants={itemVariants}
            className="text-[16px] text-[#444444] max-w-lg font-gt-standard font-normal leading-[1.25] tracking-[-0.031em]"
          >
            Discover next-generation smartphones, ultra-compact GaN power bricks, and high-fidelity spatial audio. Engineered for those who demand absolute performance.
          </motion.p>
        </motion.div>

        {/* Right Column - Floating Tactile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.35 }}
          className="relative w-full aspect-square flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full h-full max-w-[420px] max-h-[420px]"
          >
            <Image 
              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
              alt="Premium High-Fidelity Headphones"
              fill
              className="object-contain filter drop-shadow-md select-none pointer-events-none"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
