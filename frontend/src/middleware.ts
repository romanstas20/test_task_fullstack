import {NextRequest, NextResponse} from 'next/server';

export default function authMiddleware(req: NextRequest) {
    const token = req.cookies.get('token')
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/notes',
    ]
}
