'use client'
import React, { useState, useEffect } from 'react'
import Menu from './menu'
import Header from './header'
import store from '@/redux/store'
import { setMenuAdmin } from '@/redux/reducer/MenuAdminReduce'
import Login from './login'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menuadmin)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menuadmin))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    if (currentUser.id) {
        return (
            <div className='flex w-full min-h-screen max-w-[1200px] m-auto'>
                <div className={` fixed py-1 transition-all duration-500 h-screen overflow-hidden px-2 md:relative z-10 ${currentMenu ? "w-2/3 md:w-56" : "w-0 md:w-16"} `} >
                    <Menu />
                </div>
                <div className={`w-full py-1 flex flex-col transition-all duration-500 px-2 ${currentMenu ? "w-full md:w-full-56" : "w-0 md:w-full-16"}`} >
                    <Header />
                    {children}
                </div>
            </div>
        )
    }

    return (
        <Login archive='admin' />
    )
}

export default Layout