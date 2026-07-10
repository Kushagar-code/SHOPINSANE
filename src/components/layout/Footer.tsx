import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-12 px-4 md:px-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-md bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Shopinsane
            </span>
          </Link>
          <p className="text-neutral-400 text-sm max-w-sm mb-6 leading-relaxed">
            A premium digital assets marketplace showcasing zero-cost cloud architecture with immersive interface design.
          </p>
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-primary-500 hover:shadow-glow-primary transition-all duration-300">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-primary-500 hover:shadow-glow-primary transition-all duration-300">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Marketplace</h3>
          <ul className="space-y-3">
            <li><Link href="/products" className="text-sm text-neutral-400 hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/dev-ui" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Component Library</Link></li>
            <li><Link href="/#trending" className="text-sm text-neutral-400 hover:text-white transition-colors">Trending Now</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-neutral-500 text-sm">
          &copy; {currentYear} Shopinsane. MVP concept architecture.
        </p>
        <p className="text-neutral-600 text-xs flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-semantic-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          Systems Operational
        </p>
      </div>
    </footer>
  );
}
