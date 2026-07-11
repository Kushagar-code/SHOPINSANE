'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ─── Marquee Images ────────────────────────────────────────────────────────────
// Using PNG product shots with white/transparent backgrounds that vanish via
// mix-blend-mode: multiply on the light canvas (#f2f4f5).
// All images are served with &bg=white or are studio-shot on pure white.

const MARQUEE_ITEMS = [
  {
    // iPhone 15 Pro – Apple-style white studio shot
    src: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&h=500&q=90&bg=white',
    alt: 'Nothing Phone on white',
    w: 200, h: 220, yOffset: 0,
  },
  {
    // Sony WH-1000XM4 – white background product shot
    src: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&h=520&q=90',
    alt: 'Sony headphones on white',
    w: 210, h: 230, yOffset: 14,
  },
  {
    // AirPods Pro – white studio
    src: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&h=440&q=90',
    alt: 'Wireless earbuds on white background',
    w: 190, h: 200, yOffset: -10,
  },
  {
    // iPhone flat lay on white desk
    src: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=560&h=500&q=90',
    alt: 'Smartphone on white surface',
    w: 200, h: 220, yOffset: 18,
  },
  {
    // Compact GaN charger on white
    src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=480&h=420&q=90',
    alt: 'USB-C charger on white',
    w: 185, h: 200, yOffset: -6,
  },
  {
    // Smart watch on white
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=520&h=480&q=90',
    alt: 'Premium smartwatch on white',
    w: 200, h: 210, yOffset: 10,
  },
  {
    // Mechanical keyboard product shot on white
    src: 'https://images.unsplash.com/photo-1601445638532-1b608c42094f?auto=format&fit=crop&w=600&h=440&q=90',
    alt: 'Mechanical keyboard on white',
    w: 240, h: 185, yOffset: -14,
  },
]

// ─── Marquee Track ────────────────────────────────────────────────────────────

function MarqueeTrack() {
  // Triple-duplicate for a fully seamless infinite loop at any speed
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  // The animation distance is one full set width
  const itemGap = 32
  const totalWidth = MARQUEE_ITEMS.reduce((acc, item) => acc + item.w + itemGap, 0)

  return (
    // Outermost: hard-clip, NO overflow ever escapes this div
    <div
      className="w-full max-w-[100vw] overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <motion.div
        animate={{ x: [0, -totalWidth] }}
        transition={{
          duration: 28,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex items-center gap-8 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              width: item.w,
              height: item.h,
              flexShrink: 0,
              transform: `translateY(${item.yOffset}px)`,
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
                objectFit: 'contain',   // keep aspect, no crop — crucial for white-bg PNGs
                display: 'block',
                userSelect: 'none',
                pointerEvents: 'none',
                // multiply: white pixels (255,255,255) × canvas (#f2f4f5) = canvas color
                // net result: white backgrounds become invisible, gadgets float freely
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
      shop<span style={{ color: '#0047FF' }}>i</span>nsane
    </h1>
  )
}

// ─── Main Hero ────────────────────────────────────────────────────────────────

export function HeroHeader() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  return (
    // Root: w-full + overflow-hidden at the outermost level
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
        className="relative z-10 flex flex-col items-center text-center w-full overflow-hidden"
      >
        {/* Layer 1 — Hardware Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="w-full overflow-hidden"
        >
          <MarqueeTrack />
        </motion.div>

        {/* Layer 2 — Brand Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ marginTop: 40 }}
        >
          <BrandWordmark />
        </motion.div>

        {/* Layer 3 — Tagline */}
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
