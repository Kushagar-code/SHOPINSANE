'use client'

import { useEffect, useState } from 'react'
import { ChevronRight, X, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function AppDownloadBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if dismissed state exists in local storage
    const dismissed = localStorage.getItem('shopinsane_download_banner_dismissed')
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('shopinsane_download_banner_dismissed', 'true')
    setIsVisible(false)
    // Dispatch custom event to notify parent containers of height adjustment
    window.dispatchEvent(new Event('resize'))
  }

  if (!isVisible) return null

  return (
    <div className="w-full bg-ink-black text-pure-white h-12 flex items-center justify-between px-4 sticky top-0 z-50 font-shopify-sans shadow-[rgba(0,0,0,0.1)_0px_2px_8px_0px]">
      <div className="flex items-center gap-3">
        {/* Mock App Icon */}
        <div className="w-6 h-6 rounded-md bg-shop-violet flex items-center justify-center shrink-0">
          <Smartphone className="w-4 h-4 text-pure-white" />
        </div>
        
        {/* Banner Texts */}
        <div className="flex items-baseline gap-2">
          <Link 
            href="#" 
            className="text-sm hover:underline font-bold tracking-tight text-pure-white"
          >
            Download Shop app
          </Link>
          <span className="text-[10px] text-muted-gray leading-none">
            Available on iOS & Android
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Right Arrow Glyphs */}
        <Link href="#" className="flex items-center text-pure-white hover:opacity-80">
          <ChevronRight className="w-4 h-4" />
        </Link>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="text-muted-gray hover:text-pure-white p-1 rounded-full hover:bg-neutral-800 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
