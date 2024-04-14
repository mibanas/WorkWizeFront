import type { Metadata } from "next"
import Image from 'next/image'
import "../globals.css"


import { Inter as FontSans } from "next/font/google"
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "WorkWize",
  description: "WorkWize",
};

export default function AutLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {

  return (
    <>
      <div className={ cn("min-h-screen bg-background font-sans antialiased", fontSans.variable )}>
        <div className="relative h-screen my-auto">
          <div className="flex flex-row h-full items-center">
        
            <div className="w-1/2 ">
              <div className="flex flex-col">
                <h2 className="text-6xl mb-20 font-light mx-auto">
                  L'avenir  <br />
                  <span className='font-extrabold text-5xl'>de votre carrière commence ici</span>
                </h2>
                <Image
                  className="mx-auto"
                  src="/images/1.png"
                  alt="Description de l'image"
                  height={600}
                  width={600}
                />
              </div>
            </div>

            <div className="w-1/2 ">
              {children}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
