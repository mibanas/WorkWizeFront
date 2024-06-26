import type { Metadata } from "next";
import "../globals.css";


import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import Navbar from "./components/shared/Navbar";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "WorkWize",
  description: "WorkWize",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={ cn("min-h-screen overflow-x-hidden bg-[#f8f3ed] relative font-sans antialiased", fontSans.variable )}>
        <Navbar />
        {children}
      </div>
    </>
  );
}
