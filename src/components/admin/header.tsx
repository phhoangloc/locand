'use client'
import React, { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import store from '@/redux/store';
import { setMenuAdmin } from '@/redux/reducer/MenuAdminReduce';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonIcon from '@mui/icons-material/Person';
import { IconDrop } from '../tool/icon/icon';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
type Props = {}

const Header = (props: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menuadmin)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menuadmin))
        store.subscribe(() => setCurrentUser(store.getState().user))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    return (
        <div className='flex justify-between h-12  '>
            <div></div>
            {/* {currentMenu ?
                <MenuOpenIcon className='!w-auto !h-full p-2 cursor-pointer' onClick={() => store.dispatch(setMenuAdmin(false))} /> :
                <MenuIcon className='!w-auto !h-full p-2 cursor-pointer' onClick={() => store.dispatch(setMenuAdmin(true))} />} */}
            <div className="flex">
                {currentUser?.id ?
                    <IconDrop
                        icon={currentUser?.avata ? <Image src={process.env.ftp_url + currentUser.avata.name} fill className='object-cover cursor-pointer' alt='avata' /> : <PersonIcon className='!w-auto !h-full  cursor-pointer' />}
                        data={[
                            {
                                title: "Profile",
                                func: () => toPage.push("/admin/profile")
                            },
                            {
                                title: "Log Out",
                                func: () => { localStorage.clear(), store.dispatch(setRefresh()) }
                            }
                        ]} /> :
                    <IconDrop
                        icon={<PersonIcon className='!w-auto !h-full p-2 cursor-pointer' />}
                        data={[
                            {
                                title: "Login",
                                func: () => toPage.push("/admin/login")
                            },
                            {
                                title: "Sign Up",
                                func: () => toPage.push("/admin/signup")
                            }
                        ]} />
                }
            </div>
        </div>
    )
}

export default Header