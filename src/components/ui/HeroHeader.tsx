'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ─── Marquee Images ───────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  {
    src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=480&h=340&q=85',
    alt: 'Premium flagship smartphone',
    w: 240, h: 170, yOffset: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=480&h=380&q=85',
    alt: 'Sony WH-1000XM over-ear headphones',
    w: 240, h: 190, yOffset: 12,
  },
  {
    src: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=420&h=320&q=85',
    alt: 'Nano GaN 65W charger',
    w: 210, h: 160, yOffset: -8,
  },
  {
    src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=520&h=340&q=85',
    alt: 'Mechanical keyboard closeup',
    w: 260, h: 170, yOffset: 16,
  },
  {
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=460&h=360&q=85',
    alt: 'Studio wireless earbuds',
    w: 230, h: 180, yOffset: -4,
  },
  {
    src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=480&h=320&q=85',
    alt: 'Premium over-ear headphones lifestyle',
    w: 240, h: 160, yOffset: 8,
  },
  {
    src: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=440&h=380&q=85',
    alt: 'Nothing Phone transparent back design',
    w: 220, h: 190, yOffset: -12,
  },
]

// ─── Marquee Track Component ──────────────────────────────────────────────────

function MarqueeTrack() {
  // Duplicate the list for seamless looping
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const totalWidth = MARQUEE_ITEMS.reduce((acc, item) => acc + item.w + 16, 0)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        // Fade edges into the canvas background
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <motion.div
        animate={{ x: [0, -totalWidth] }}
        transition={{
          duration: 32,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex items-end gap-4 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              width: item.w,
              height: item.h,
              flexShrink: 0,
              marginBottom: item.yOffset > 0 ? 0 : Math.abs(item.yOffset),
              marginTop: item.yOffset > 0 ? item.yOffset : 0,
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="eager"
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 16,
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─── Brand Wordmark ───────────────────────────────────────────────────────────

function BrandWordmark() {
  // "shopinsane" — color the dot on the "i" violet
  // The "i" is at index 4 (s-h-o-p-i). We colour just the letter itself;
  // the "dot" lives above the letter body but coloring the glyph #0047FF achieves this.
  const before = 'shop'
  const accent = 'i'
  const after = 'nsane'

  return (
    <h1
      style={{
        fontSize: 'clamp(52px, 8.5vw, 112px)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: '#000000',
        margin: 0,
        fontFamily: 'var(--font-inter), "Inter", sans-serif',
        userSelect: 'none',
      }}
    >
      {before}
      <span style={{ color: '#0047FF' }}>{accent}</span>
      {after}
    </h1>
  )
}

// ─── Main Hero Component ──────────────────────────────────────────────────────

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden z-10"
      style={{ background: '#f2f4f5' }}
    >
      <motion.div
        style={{
          paddingTop: 'clamp(80px, 12vw, 140px)',
          paddingBottom: 0,
          opacity: opacityHero as any,
          y: yHero as any,
        }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* ── Layer 1: Hardware Marquee ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <MarqueeTrack />
        </motion.div>

        {/* ── Layer 2: Brand Wordmark ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ marginTop: 40 }}
        >
          <BrandWordmark />
        </motion.div>

        {/* ── Layer 3: Tagline ─────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          style={{
            marginTop: 16,
            marginBottom: 80,
            fontSize: 16,
            letterSpacing: '-0.031em',
            color: '#787574',
            fontWeight: 400,
            fontFamily: 'var(--font-inter), "Inter", sans-serif',
            lineHeight: 1.5,
          }}
        >
          Handpicked technology for the uncompromising.
        </motion.p>
      </motion.div>
    </div>
  )
}
