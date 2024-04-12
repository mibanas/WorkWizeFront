import { NextResponse , NextRequest } from 'next/server'

import { cookies } from 'next/headers'

const isLogged = true

export async function middleware(request: NextRequest) {

    const pathname = request.nextUrl.pathname; // Use request.nextUrl for pathname
    const cookieStore = cookies()
    const user = cookieStore.get('user')


    if (pathname.includes('dashboard')) {
        if (!user) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()

}