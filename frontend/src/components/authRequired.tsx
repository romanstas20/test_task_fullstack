"use client"
import React, {useEffect} from 'react';
import {Cookies} from 'react-cookie';
import {useRouter} from 'next/navigation'
import SignIn from '@/app/login/page';
import {usePathname} from 'next/navigation'
import Header from "@/components/Header";


const AuthRequired = ({children}) => {
    const {push} = useRouter();
    const pathname = usePathname();
    const cookies = new Cookies();
    const token = cookies.get('token');


    console.log(pathname);
    if (!token) {
        if (pathname !== '/login' && pathname !== '/register') {
            push('/login');
            return <SignIn/>
        }
    }

    return (
        <div>
            {token && <Header/>}
            {children}
        </div>);
};

export default AuthRequired;
