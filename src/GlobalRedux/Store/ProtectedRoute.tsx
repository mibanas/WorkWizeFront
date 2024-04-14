'use client'
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';


export function  ProtectedRoute({children}: {children: ReactNode}) {
    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (router.pathname.includes('/dashboard') && !token) {
        router.push('/login');
      }
    }, []);
  
    return children;
  }
  
  