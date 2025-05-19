import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/theme-registry"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Electronic Paralegal",
  description: "Evaluate criminal cases for procedural due process issues",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
