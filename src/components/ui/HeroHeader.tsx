'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 }
  }
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const imageEntryVariant = {
  hidden: { opacity: 0, scale: 0.93, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacityHero = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden z-10"
      style={{ background: '#222f30' }}
    >
      {/* ── Subtle noise texture overlay ─────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          opacity: 0.18,
          mixBlendMode: 'overlay'
        }}
      />

      {/* ── Very faint radial glow at top-right ──────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(206,247,158,0.06) 0%, transparent 65%)',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: opacityHero, y: yHero }}
        className="relative z-10 max-w-[1200px] mx-auto px-6 pt-36 pb-[140px] grid grid-cols-1 md:grid-cols-2 items-center gap-16"
      >
        {/* LEFT: Lab-instrument Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col text-left"
          style={{ gap: '28px' }}
        >
          {/* Bioscience Publication Tag */}
          <motion.div
            variants={fadeUpVariant}
            className="flex items-center gap-2.5 w-fit"
          >
            {/* Breathing Lime Dot */}
            <motion.span
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block flex-shrink-0 rounded-full"
              style={{ width: 6, height: 6, background: '#cef79e' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-roboto-mono), "Courier New", monospace',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#c9cbbe',
                textTransform: 'uppercase',
              }}
            >
              New Arrivals 2026
            </span>
          </motion.div>

          {/* Massive Hero Headline — weight 400, tight tracking */}
          <motion.h1
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-inter), "Inter", sans-serif',
              fontSize: 'clamp(62px, 7.5vw, 100px)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-4.74px',
              color: '#ffffff',
              margin: 0,
            }}
          >
            Insane Tech.<br />
            Zero Compromise.
          </motion.h1>

          {/* Sub-Headline */}
          <motion.p
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-inter), "Inter", sans-serif',
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1.35,
              color: '#8fa3a4',
              maxWidth: '460px',
              margin: 0,
            }}
          >
            Discover next-generation smartphones, ultra-compact GaN power bricks, and high-fidelity spatial audio. Engineered for absolute performance.
          </motion.p>
        </motion.div>

        {/* RIGHT: Floating Dark-Mode Tech Image */}
        <motion.div
          variants={imageEntryVariant}
          initial="hidden"
          animate="visible"
          className="relative w-full flex items-center justify-center"
          style={{ aspectRatio: '1 / 1' }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full"
            style={{
              maxWidth: 460,
              maxHeight: 460,
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=85"
              alt="Premium high-fidelity headphones on dark background"
              fill
              className="object-cover select-none pointer-events-none"
              style={{ filter: 'brightness(0.78) saturate(0.55)' }}
              priority
            />
            {/* Lime accent edge glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[20px]"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(206,247,158,0.10), 0 0 40px 0px rgba(206,247,158,0.06)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
