'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const runtime = 'edge'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-canvas-mist min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto space-y-8">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-gt-standard font-medium text-muted-gray hover:text-ink-black transition-colors -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to marketplace
        </Link>

        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-pure-white rounded-cards shadow-sm border border-faint-border p-8 sm:p-12 space-y-8 text-ink-black"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-gt-standard font-semibold tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-muted-gray font-gt-standard">Last updated: July 11, 2026</p>
          </div>

          <hr className="border-faint-border" />

          <div className="space-y-6 font-gt-standard text-base leading-relaxed tracking-tight text-neutral-800">
            <p>
              Shopinsane is dedicated to maintaining the privacy and security of your digital footprint. This document describes our practices regarding information tracking.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">1. Information We Track</h2>
            <p>
              Because Shopinsane functions as a simulative sandbox application, we do not compile, sell, or parse database entries tracking your physical identity. Session cookies and local storage segments are initialized locally inside your browser cache to preserve your cart details and mock login statuses.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">2. Supabase GoTrue Auth</h2>
            <p>
              If you register a customer profile on our portal, your email address is handled securely by Supabase Authentication modules. Password credentials are encrypted prior to database insertion.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">3. Cookies</h2>
            <p>
              We declare secure HTTP cookies (such as `shopinsane_mock_session`) to authorize access to our private administrative routes. These cookies do not perform cross-site tracking or advertising profiling.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">4. Third-Party Connections</h2>
            <p>
              Mock database items load photographic representations hosted on Unsplash networks. We do not transmit user parameters to Unsplash when loading these visual components.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">5. Updates to this Policy</h2>
            <p>
              We reserve the right to modify this statement. Changes are active immediately upon placement of the updated draft on this route.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
