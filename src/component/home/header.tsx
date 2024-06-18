'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import store from '@/redux/store';
import { setTheme } from '@/redux/reducer/ThemeReduce';
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

    return (
        <div className={`w100p h50px ps-f top-0px  zi-2 opacity-1-10 hover-opacity cs-p trss-1-4 `} >
            <div className='dp-flex jc-sp-bw w100p mw-1200px mg-auto'>
                <div className="svg50"><MenuIcon /></div>
                <h1 className='dp-flex fd-col jc-center'>locand</h1>
                <div className="svg50 cs-p">
                    <NotificationsIcon />
                    {currentTheme ?
                        <DarkModeIcon onClick={() => store.dispatch(setTheme(false))} /> :
                        <LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
                </div>
            </div>
        </div>
    )
}

export default Header