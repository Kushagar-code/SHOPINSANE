import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SidebarRail } from "@/components/layout/SidebarRail";
import { AppDownloadBanner } from "@/components/layout/AppDownloadBanner";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { getCurrentUser } from "@/lib/api/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Shopinsane",
  description: "Premium Digital Assets Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} ${inter.className} min-h-screen flex flex-col bg-canvas-mist text-ink-black antialiased`}>
        <AppDownloadBanner />
        <div className="flex-1 flex">
          <SidebarRail user={user} />
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
