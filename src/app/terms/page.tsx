'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const runtime = 'edge'

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl font-gt-standard font-semibold tracking-tight">Terms of Service</h1>
            <p className="text-xs text-muted-gray font-gt-standard">Last updated: July 11, 2026</p>
          </div>

          <hr className="border-faint-border" />

          <div className="space-y-6 font-gt-standard text-base leading-relaxed tracking-tight text-neutral-800">
            <p>
              Welcome to Shopinsane. By using our platform, you agree to comply with and be bound by the following terms and conditions of use.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">1. Scope of Agreement</h2>
            <p>
              This document governs your access to and use of the Shopinsane storefront catalog, transaction simulations, and associated cloud-hosted components. These terms apply to all visitors, developers, and mock administrative users.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">2. Simulative Transactions</h2>
            <p>
              All purchases, checking loops, carrier timelines, and inventory adjustments processed on Shopinsane are entirely simulated. No actual financial payloads are transmitted, and no physical delivery operations occur. You agree not to attempt processing real credit credentials on mock checkout forms.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">3. Proprietary Intellectual Rights</h2>
            <p>
              The design tokens, GT Standard typography structures, component rails, and custom animations displayed within this application are the proprietary assets of Shopinsane and its architectural layout creators.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">4. Disclaimers & Warranties</h2>
            <p>
              The platform is provided &quot;as is&quot; without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">5. Governing Legislation</h2>
            <p>
              Any claims relating to Shopinsane&apos;s digital infrastructure shall be governed by the laws of the operating jurisdiction without regard to its conflict of law provisions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
