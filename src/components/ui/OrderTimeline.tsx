'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Package, Truck, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export type OrderStatus = 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered'

interface OrderTimelineProps {
  status: OrderStatus
}

const MILESTONES = [
  { status: 'Ordered', icon: CheckCircle2, label: 'Order Placed' },
  { status: 'Shipped', icon: Package, label: 'Shipped' },
  { status: 'Out for Delivery', icon: Truck, label: 'Out for Delivery' },
  { status: 'Delivered', icon: Home, label: 'Delivered' },
] as const

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStepIndex = MILESTONES.findIndex((m) => m.status === status)
  // Fallback to 0 if status is unknown
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex

  return (
    <div className="relative py-4 md:py-8 w-full">
      {/* 
        DESKTOP LAYOUT (Horizontal)
      */}
      <div className="hidden md:block relative w-full select-none">
        {/* Background Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-cool-stone/30 z-0 rounded-full" />
        
        {/* Active Line (Animated) */}
        <motion.div 
          className="absolute top-6 left-0 h-0.5 bg-shop-violet z-0 rounded-full"
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
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-pure-white transition-all duration-500",
                    isActive ? "bg-shop-violet text-pure-white shadow-lg-2" : "bg-canvas-mist text-muted-gray border-faint-border"
                  )}
                >
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </motion.div>
                <span className={cn(
                  "text-xs font-gt-standard font-medium transition-colors duration-500 text-center whitespace-nowrap",
                  isActive ? "text-ink-black font-semibold" : "text-muted-gray"
                )}>
                  {milestone.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 
        MOBILE LAYOUT (Vertical)
      */}
      <div className="block md:hidden relative pl-8 select-none space-y-8">
        {/* Background Vertical Line */}
        <div className="absolute top-6 left-5 w-0.5 h-[80%] bg-cool-stone/30 z-0 rounded-full" />
        
        {/* Active Vertical Line */}
        <motion.div 
          className="absolute top-6 left-5 w-0.5 bg-shop-violet z-0 rounded-full"
          initial={{ height: '0%' }}
          animate={{ height: `${(activeIndex / (MILESTONES.length - 1)) * 80}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {MILESTONES.map((milestone, index) => {
          const isActive = index <= activeIndex
          const Icon = milestone.icon

          return (
            <div key={milestone.status} className="flex items-center gap-4 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-[3px] border-canvas-mist transition-all duration-500 shrink-0",
                  isActive ? "bg-shop-violet text-pure-white shadow-lg-2" : "bg-canvas-mist text-muted-gray border-faint-border"
                )}
              >
                <Icon className="w-4 h-4 stroke-[1.5]" />
              </motion.div>
              <div className="flex flex-col font-gt-standard">
                <span className={cn(
                  "text-sm transition-colors duration-500 font-medium",
                  isActive ? "text-ink-black font-semibold" : "text-muted-gray"
                )}>
                  {milestone.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
