import "./globals.css"

import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"], // Add other weights if needed
});
import ScrollToTop from "./components/scrolltop"; // Import the ScrollToTop component



export const metadata = {
  title: "TREC | The Real Estate Company",
  description: "Discover exceptional properties with The Real Estate Company, your premier luxury real estate partner",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
        <Header />
       
        {children}
        <Footer />
        <ScrollToTop /> 
      </body>
    </html>
    </ClerkProvider>
  )
}

