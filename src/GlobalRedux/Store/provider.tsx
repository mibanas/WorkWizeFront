'use client'

import { store } from './store'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'


import { useEffect } from 'react';
import { useRouter } from 'next/router';


export function Providers({children}: {children: ReactNode}) {
    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem('accessToken');
    //     if (router.pathname.includes('dashboard') && !token) {
    //         router.push('/login');
    //     }
    // }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}