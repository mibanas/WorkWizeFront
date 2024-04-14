import type { Metadata } from "next";
import { cn } from "@/lib/utils"
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
 
import { Providers } from "@/GlobalRedux/Store/provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "WorkWize",
  description: "WorkWize",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ cn("min-h-screen bg-background font-sans antialiased", fontSans.variable )}>        
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}
