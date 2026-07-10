import Link from "next/link";
import { LogIn, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CartButton } from "@/components/ui/CartButton";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/login/actions";

export async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            {/* Logo placeholder */}
            <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-glow-primary">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Shopinsane
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/products" className="transition-colors hover:text-white">
              Catalog
            </Link>
            <Link href="/dev-ui" className="transition-colors hover:text-primary-400">
              Dev UI
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile menu - can be extracted into separate component later */}
          <Button variant="ghost" size="sm" className="md:hidden px-2">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden sm:flex shadow-sm items-center gap-4">
            {user ? (
              <form action={logout} className="hidden sm:flex">
                <span className="text-sm text-neutral-400 mr-4 self-center">{user.email}</span>
                <Button type="submit" variant="ghost" size="sm" className="text-neutral-300">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link href="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Link>
              </Button>
            )}
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
