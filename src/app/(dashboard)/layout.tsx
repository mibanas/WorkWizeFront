
import type { Metadata } from "next";
import "../globals.css";


import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
import {
  Bell,
  Package2,
  Pickaxe,
} from "lucide-react"
import Header from "./components/shared/Header";
import Navbare from "./components/shared/Navbar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "WorkWize",
  description: "WorkWize",
};

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <>
      <div className={ cn("min-h-screen bg-background font-sans antialiased", fontSans.variable )}>

        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Pickaxe className="h-6 w-6" />
                  <span className="">WORKWIZE</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
              <Navbare />
            </div>
          </div>

          <div className="flex flex-col">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}