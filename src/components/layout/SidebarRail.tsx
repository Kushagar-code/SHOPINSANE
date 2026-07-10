'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function SidebarRail() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      href: '/checkout',
      label: 'Checkout',
      icon: ShoppingBag,
      isActive: pathname === '/checkout'
    },
    {
      href: '/admin',
      label: 'Admin Panel',
      icon: Lock,
      isActive: pathname.startsWith('/admin')
    }
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-pure-white z-40 flex flex-col items-center py-6 shadow-[rgba(0,0,0,0.06)_1px_0px_0px_0px]">
      {/* Brand Icon or Spot */}
      <div className="mb-8">
        <Link href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-shop-violet text-pure-white font-gt-standard font-semibold text-lg hover:opacity-90 active:scale-95 transition-all">
          S<span className="text-pure-white text-[10px] leading-none -mt-2">.</span>
        </Link>
      </div>

      {/* Navigation Rails */}
      <nav className="flex-1 w-full flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "w-12 h-12 flex items-center justify-center transition-all duration-200 group relative",
                "rounded-pills", // 20px radius
                item.isActive 
                  ? "bg-canvas-mist text-ink-black" 
                  : "text-muted-gray hover:text-ink-black hover:bg-canvas-mist/50"
              )}
            >
              <Icon className="w-6 h-6 stroke-[1.5]" />
              
              {/* Tooltip */}
              <span className="absolute left-16 scale-0 transition-all rounded bg-ink-black p-2 text-xs text-pure-white group-hover:scale-100 whitespace-nowrap z-50 pointer-events-none">
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Profile Avatar */}
      <div className="mt-auto">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-faint-border hover:opacity-80 cursor-pointer transition-opacity">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80"
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </aside>
  )
}
