'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const runtime = 'edge'

export default function RefundPolicyPage() {
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
            <h1 className="text-3xl font-gt-standard font-semibold tracking-tight">Refund Policy</h1>
            <p className="text-xs text-muted-gray font-gt-standard">Last updated: July 11, 2026</p>
          </div>

          <hr className="border-faint-border" />

          <div className="space-y-6 font-gt-standard text-base leading-relaxed tracking-tight text-neutral-800">
            <p>
              Thank you for simulating a transaction on Shopinsane. Because our services are entirely non-commercial sandbox simulations, please read our policies on transactions.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">1. Refund Eligibility</h2>
            <p>
              No real payments are collected, processed, or deposited by Shopinsane. Therefore, no physical currency refunds can be requested, authorized, or issued under any circumstance.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">2. Dynamic Stock Reversals</h2>
            <p>
              If you wish to restore inventory stock levels for mock items (e.g. if you placed an order that depleted stock), you can cancel the simulated order directly inside the Administrative Panel or use the clear storage controls to reset the local database.
            </p>

            <h2 className="text-lg font-semibold text-ink-black pt-2">3. Simulated Order Cancelation</h2>
            <p>
              Orders can be canceled by administrative accounts from the dashboard. Upon cancelation, the associated item quantities are successfully added back to the product stock index automatically.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
