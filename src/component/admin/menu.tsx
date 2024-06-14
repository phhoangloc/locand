'use client'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { setMenu } from '@/redux/reducer/MenuReduce';
import store from '@/redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArticleIcon from '@mui/icons-material/Article';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
type Props = {}

const Menu = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const menus = [
        {
            icon: <DashboardIcon />,
            name: "dashboard",
            link: "/admin"
        },
        {
            icon: <ArticleIcon />,
            name: "blog",
            link: "/admin/blog"
        },
        {
            icon: <LocalLibraryIcon />,
            name: "book",
            link: "/admin/book"
        }
    ]

    return (
        <div className={`ps-ab top-0px le-0px w300px h100h trss-1-4 bglv1 min768-ps-st min768-trsf-0  min768-gr-none min768-h100h-h min768-top50px zi-1 ${currentMenu ? "" : "trsf-left--100p"}`}>
            <div className='pd-top-50px min768-pd-top-0'>
                <div className='svg50 ps-ab top-5px ri-5px cs-p min768-dp-none' >
                    <CloseIcon onClick={() => store.dispatch(setMenu(false))} />
                </div>
                {menus.map((menu: any, index: number) =>
                    <div key={index} className='dp-flex cs-p' onClick={() => { toPage.push(menu.link), store.dispatch(setMenu(false)) }}>
                        <div className='svg50'>{menu.icon}</div>
                        <p className='h40px dp-flex fd-col jc-center'>{menu.name}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Menu