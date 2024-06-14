import React from 'react'
import { Metadata } from 'next';
import Header from '@/component/admin/header';
import Menu from '@/component/admin/menu';
import Authen from '@/component/admin/auth/authen';
type Props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "Admin",
};

const Layout = ({ children }: Props) => {
    return (
        <Authen>
            <Header />
            <div className='min768-dp-flex'>
                <Menu />
                <div className='w100p pd-5px min768-w100p-300px mh100h-h ta-l'>
                    {children}
                </div>
            </div>
        </Authen>
    )
}

export default Layout