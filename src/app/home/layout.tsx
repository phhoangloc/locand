import React from 'react'
import { Metadata } from 'next';
import Header from '@/component/home/header';
type Props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "Home",
};
const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout