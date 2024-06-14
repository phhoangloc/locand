'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Image from 'next/image'
import IconToggle from '../tool/iconToggle'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccordionIcon from '../tool/accordionIcon';
import PersonIcon from '@mui/icons-material/Person';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReduce'
import Link from 'next/link'
import { setAlert } from '@/redux/reducer/alertReducer'
type Props = {}

const Header = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const [currentAlert, setCurrentAlert] = useState<any>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    useEffect(() => {
        update()
    })

    useEffect(() => {
        if (currentAlert.value) {
            localStorage.clear()
            store.dispatch(setRefresh())
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
        }
    }, [currentAlert?.value])


    return (
        <div className={`w100p dp-flex h50px ps-st top-0px zi-2 ${currentTheme ? "themelight" : "themedark"}`}>
            <IconToggle
                sx="svg50 ps-ab ri-5px top-5px cs-p"
                icon1={<DarkModeIcon onClick={() => store.dispatch(setTheme(false))} />}
                icon2={<LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
                value={currentTheme} />
            <IconToggle
                sx='svg50 h40px mg-auto-0 cs-p min768-dp-none'
                icon1={<CloseIcon onClick={() => store.dispatch(setMenu(false))} />}
                icon2={<MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                value={currentMenu} />
            {currentUser?._id ?
                <AccordionIcon
                    icon={<PersonIcon style={{ width: "100%", height: "100%" }} />}
                    data={[
                        {
                            name: "Profile",
                            link: "/admin/profile"
                        },
                        {
                            name: "Log Out",
                            func: () => { store.dispatch(setAlert({ value: false, open: true, msg: "would you like to log out..." })) }
                        }
                    ]}
                    top="5px"
                    right='40px' /> :
                <AccordionIcon
                    icon={<PersonIcon style={{ width: "100%", height: "100%" }} />}
                    data={[
                        {
                            name: "Log In",
                            link: "/login"
                        },
                        {
                            name: "Sign Up",
                            link: "/signup"
                        }
                    ]}
                    top="5px"
                    right='40px' />
            }
            <Link href={"/"} target='_blank' ><h3 className='h100p dp-flex fd-col jc-center pd-0px-5px'>LOCAND</h3></Link>

        </div>
    )
}

export default Header