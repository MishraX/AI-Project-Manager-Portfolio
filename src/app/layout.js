import { Outfit } from "next/font/google";
import "./globals.css";
import CreatureCursor from "@/components/CreatureCursor";

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
      </body>
    </html>
  );
}
