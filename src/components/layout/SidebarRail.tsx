'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ShoppingBag, Lock, LogIn, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { logout } from '@/app/login/actions'
import { UserSession } from '@/lib/api/auth'
import { useEffect, useState } from 'react'
import { getAdminSession } from '@/app/admin/actions'

interface SidebarRailProps {
  user: UserSession | null
}

export function SidebarRail({ user }: SidebarRailProps) {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdmin() {
      const session = await getAdminSession()
      setIsAdmin(session.isAdmin)
    }
    checkAdmin()
  }, [user])

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
    ...(isAdmin ? [{
      href: '/admin',
      label: 'Admin Panel',
      icon: Lock,
      isActive: pathname.startsWith('/admin')
    }] : [])
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

      {/* Bottom Profile Avatar or Login */}
      <div className="mt-auto flex flex-col items-center gap-4">
        {user ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-faint-border group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&q=80"
                alt="Profile Avatar"
                fill
                className="object-cover"
              />
              <span className="absolute left-16 scale-0 transition-all rounded bg-ink-black p-2 text-xs text-pure-white group-hover:scale-100 whitespace-nowrap z-50 pointer-events-none">
                {user.email}
              </span>
            </div>
            
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="w-8 h-8 flex items-center justify-center text-muted-gray hover:text-ink-black rounded-full hover:bg-canvas-mist transition-colors"
            >
              <LogOut className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            title="Sign In"
            className="w-12 h-12 flex items-center justify-center text-muted-gray hover:text-ink-black rounded-pills hover:bg-canvas-mist transition-colors"
          >
            <LogIn className="w-6 h-6 stroke-[1.5]" />
          </Link>
        )}
      </div>
    </aside>
  )
}
