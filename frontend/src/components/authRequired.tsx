"use client"
import React, {ReactNode} from 'react';
import {Cookies} from 'react-cookie';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';

import SignIn from '@/app/login/page';
import Header from "@/components/Header";

interface AuthRequiredProps {
    children: ReactNode;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({children}) => {
    const {push} = useRouter();
    const pathname = usePathname();
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
        if (pathname !== '/login' && pathname !== '/register') {
            push('/login');
            return <SignIn/>;
        }
    }

    return (
        <div>
            {token && <Header/>}
            {children}
        </div>
    );
};

export default AuthRequired;
