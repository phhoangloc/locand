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
type Props = {}

const Menu = (props: Props) => {

    const toPage = useRouter()
    const menus = [
        {
            icon: <DashboardIcon className='!w-12 !h-auto p-2' />,
            title: "Dashboard",
            func: () => { toPage.push("/admin") },
        },

        // {
        //     icon: <TurnedInIcon className='!w-12 !h-auto p-2' />,
        //     title: "Blogs",
        //     func: () => { toPage.push("/admin/blog") }

        // },
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
                    <div key={index} className='flex overflow-hidden rounded cursor-pointer opacity-75 hover:opacity-100' onClick={() => { m.func && m.func(), window.innerWidth < 768 && store.dispatch(setMenuAdmin(false)) }}>
                        {m.icon}
                        <p className='flex flex-col justify-center px-1'>{m.title}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Menu