import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import CreatureCursor from "@/components/CreatureCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "AI Project Manager | Portfolio",
  description: "Portfolio of a Creative AI Project Manager",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body className={outfit.className} suppressHydrationWarning>
        <CreatureCursor />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
