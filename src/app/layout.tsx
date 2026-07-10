import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarRail } from "@/components/layout/SidebarRail";
import { AppDownloadBanner } from "@/components/layout/AppDownloadBanner";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopinsane",
  description: "Premium Digital Assets Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-canvas-mist text-ink-black antialiased`}>
        <AppDownloadBanner />
        <div className="flex-1 flex">
          <SidebarRail />
          <main className="flex-1 pl-16 min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </main>
        </div>
        <CartDrawer />
      </body>
    </html>
  );
}
