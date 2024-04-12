'use client'

import { navLinks } from '../../constants/navLinks'
import { useEffect, useState } from 'react'
import Logo from '../(home)/Logo'
import Link from 'next/link'


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [isLoggedIn, setSsLoggedIn] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
          const isScrolled = window.scrollY > 0;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    return (
        <header className={`px-10 fixed top-0 left-0 w-full z-30 ${scrolled ? 'bg-[#e0ddc7]' : 'bg-transparent'} transition-all`}>
            <div className='relative py-6 flex justify-between transition-all'>
                <Logo/>
                <nav className='hidden md:flex gap-8 font-medium'>
                    {navLinks.map((link, index) => {
                        if (link === 'LOGIN' && isLoggedIn) {
                            return null
                        }
                        if (link === 'DASHBOARD' && !isLoggedIn) {
                            return null
                        }
                        return (
                            <Link
                                key={index}
                                href={link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`} 
                                className={(link.toLowerCase() === 'login' || link.toLowerCase() === 'dashboard') ? 'text-[#22537b] font-extrabold hover:text-[#ffffff] hover:bg-[#2F4858] rounded px-3 py-1' : 'text-[#000000] hover:text-[#ffffff] hover:bg-[#2F4858] rounded px-3 py-1'}
                            > {link} </Link>
                        )
                     
                    })} 
                </nav>
                {/* <MobileNave /> */}
            </div>
        </header>
    )
}

export default Navbar