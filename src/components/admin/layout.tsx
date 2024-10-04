'use client'
import React, { useState, useEffect } from 'react'
import Menu, { Menu2Layout } from './menu'
import Header from './header'
import store from '@/redux/store'
import { setMenuAdmin } from '@/redux/reducer/MenuAdminReduce'
import Login from './login'
type Props = {
    children: React.ReactNode
}
export const LayoutV2 = ({ children }: Props) => {

    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menuadmin)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menuadmin))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    const [_number, set_number] = useState<number>(0)
    if (currentUser.id) {
        return (
            <div className='flex w-full min-h-screen max-w-[12000px] m-auto justify-between p-2 box-border'>
                <div className={` transition-all duration-500 h-full  z-10 w-12  sticky top-0`} >
                    <Menu2Layout number={_number} changeNo={(n) => set_number(n)} />
                </div>
                <div className={`w-full-12 flex flex-col transition-all duration-500 pl-2 ${_number !== -1 ? "lg:w-full-64" : "lg:w-full-12"}`} onClick={() => set_number(-1)}>
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