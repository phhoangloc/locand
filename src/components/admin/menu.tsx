'use client'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import { useRouter } from 'next/navigation';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import store from '@/redux/store';
import { setMenuAdmin } from '@/redux/reducer/MenuAdminReduce';
import { useState, useEffect } from 'react';
type Props = {
    number?: number
    changeNo?: (n: number) => void
}

const Menu = (props: Props) => {

    const toPage = useRouter()
    const menus = [
        {
            icon: <DashboardIcon className='!w-12 !h-auto p-2' />,
            title: "Dashboard",
            func: () => { toPage.push("/admin") },
        },

        {
            position: "admin",
            icon: <TurnedInIcon className='!w-12 !h-auto p-2' />,
            title: "Pages",
            func: () => { toPage.push("/admin/page") }

        },
        {
            icon: <PersonIcon className='!w-12 !h-auto p-2' />,
            title: "User",
            func: () => { toPage.push("/admin/user") },
        },
        {
            icon: <ImageIcon className='!w-12 !h-auto p-2' />,
            title: "Media",
            func: () => { toPage.push("/admin/media") },
        },
    ]
    return (
        <div className='w-full bg-white dark:bg-slate-800 md:!bg-inherit rounded h-full '>
            <div className='flex justify-between'>
                <div className="h-12 w-12 flex flex-col justify-center p-2 text-center font-bold text-2xl ">L</div>
                <MenuOpenIcon className='!w-9 !h-auto p-1 md:!hidden cursor-pointer' onClick={() => store.dispatch(setMenuAdmin(false))} />
            </div>
            {
                menus.map((m, index) =>
                    m.position !== "admin" ? <div key={index} className='flex overflow-hidden rounded cursor-pointer opacity-75 hover:opacity-100' onClick={() => { m.func && m.func(), window.innerWidth < 768 && store.dispatch(setMenuAdmin(false)) }}>
                        {m.icon}
                        <p className='flex flex-col justify-center px-1'>{m.title}</p>
                    </div> : null
                )
            }
        </div>
    )
}
export const Menu2Layout = ({ number, changeNo }: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menuadmin)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menuadmin))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    const [index, setIndex] = useState<number>(0)
    const toPage = useRouter()
    const menus = [
        {
            icon: <DashboardIcon className='!w-12 !h-auto p-2' />,
            title: "Dashboard",
            children: [
                {
                    title: "Dashboard",
                    func: () => { toPage.push("/admin") },
                },
                {
                    title: "Home",
                    func: () => { toPage.push("/") },
                },
            ]
        },

        {
            icon: <TurnedInIcon className='!w-12 !h-auto p-2' />,
            title: "Page",
            children: [
                {
                    title: "news page",
                    func: () => { toPage.push("/admin/page/news") },
                },
                {
                    title: "page",
                    func: () => { toPage.push("/admin/page") },
                },
            ]
        },
        {
            icon: <TurnedInIcon className='!w-12 !h-auto p-2' />,
            title: "Blog",
            children: [
                {
                    title: "news blog",
                    func: () => { toPage.push("/admin/blog/news") },
                },
                {
                    title: "blog",
                    func: () => { toPage.push("/admin/blog") },
                },
            ]
        },
        // {
        //     icon: <TurnedInIcon className='!w-12 !h-auto p-2' />,
        //     title: "Components",
        //     children: [{
        //         title: "cover",
        //         func: () => { toPage.push("/admin/component/cover") },
        //     },
        //     {
        //         title: "template",
        //         func: () => { toPage.push("/admin/component/template") },
        //     }
        //     ]

        // },
        {
            icon: <PersonIcon className='!w-12 !h-auto p-2' />,
            title: "User",
            children: [
                {
                    title: "View Profile",
                    func: () => { toPage.push("/admin/profile") },
                },
                {
                    position: "admin",
                    title: "View User",
                    func: () => { toPage.push("/admin/user") },
                },
            ]
        },
        {
            icon: <ImageIcon className='!w-12 !h-auto p-2' />,
            title: "Media",
            children: [
                {
                    title: "Views Pic",
                    func: () => { toPage.push("/admin/media") },
                },
            ]
        },
    ]
    useEffect(() => {
        number === -1 && setIndex(-1)
    }, [number])

    useEffect(() => {
        changeNo && changeNo(index)
    }, [index])

    return (
        <div className={`${index === -1 ? "w-12" : "w-64"} transition-all duration-500 h-screen rounded`}>
            <div className="bg-white dark:bg-slate-800 flex w-full h-full shadow-md">
                <div className='w-12'>
                    {
                        menus.map((m, i) => <div key={i} className={`flex overflow-hidden rounded cursor-pointer w-max m-auto ${i === index ? "opacity-100" : "opacity-75"} hover:opacity-100`} onClick={() => { setIndex(-1), setTimeout(() => { setIndex(i) }, 1); }}>
                            {m.icon}
                        </div>
                        )
                    }
                </div>
                <div className={`w-52 border-l-[1px] border-slate-100 dark:border-slate-900`}>
                    <p className='h-12 text-xl p-4 flex flex-col justify-center font-bold'>{menus[index]?.title}</p>
                    {menus[index]?.children.map((child: any, indexChild: number) =>
                        child?.position !== "admin" || child.position === currentUser.position ?
                            <div className={`h-12  p-4 flex flex-col justify-center opacity-75 hover:opacity-100 cursor-pointer ani_bottom_to_top`} key={indexChild} onClick={() => child.func()}>{child.title}</div> : null
                    )}
                </div>
            </div>
        </div>
    )
}
export default Menu