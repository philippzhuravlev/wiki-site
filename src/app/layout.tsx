import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantasy World Wiki",
  description: "A wiki for our fantasy world across three eras",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background min-h-screen`}
      >
        <Sidebar />
        <div className="pl-48">
          <div className="fixed top-0 right-0 left-48 z-50">
            <Header />
          </div>
          <main className="max-w-7xl mx-auto px-8 py-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
