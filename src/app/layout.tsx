"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {DashboardProntuarioProvider} from "@/app/DashboardProntuarioProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <DashboardProntuarioProvider>
    <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
    </html>
      </DashboardProntuarioProvider>
  );
}
