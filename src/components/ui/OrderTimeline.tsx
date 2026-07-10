'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Package, Truck, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export type OrderStatus = 'Ordered' | 'Processing' | 'Shipped' | 'Delivered'

interface OrderTimelineProps {
  status: OrderStatus
}

const MILESTONES = [
  { status: 'Ordered', icon: CheckCircle2, label: 'Order Placed' },
  { status: 'Processing', icon: Package, label: 'Processing' },
  { status: 'Shipped', icon: Truck, label: 'Shipped' },
  { status: 'Delivered', icon: Home, label: 'Delivered' },
] as const

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStepIndex = MILESTONES.findIndex((m) => m.status === status)
  // Fallback to 0 if status is unknown
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex

  return (
    <div className="relative py-8">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-800 -translate-y-1/2 z-0 rounded-full" />
      
      {/* Active Line (Animated) */}
      <motion.div 
        className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 z-0 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${(activeIndex / (MILESTONES.length - 1)) * 100}%` }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex justify-between items-center w-full">
        {MILESTONES.map((milestone, index) => {
          const isActive = index <= activeIndex
          const Icon = milestone.icon

          return (
            <div key={milestone.status} className="flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-4 border-neutral-950 transition-colors duration-500",
                  isActive ? "bg-primary-500 text-white shadow-glow-primary" : "bg-neutral-800 text-neutral-500"
                )}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className={cn(
                "text-sm font-medium transition-colors duration-500 text-center absolute mt-16 whitespace-nowrap",
                isActive ? "text-white" : "text-neutral-500"
              )}>
                {milestone.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
