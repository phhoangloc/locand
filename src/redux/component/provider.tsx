'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { UserAuthen } from '@/api/UserAuthen'
import { setUser } from '../reducer/UserReduce'
import LoadingCom from '@/component/admin/fixed/loadingCom'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))

    }
    useEffect(() => {
        update()
    })

    const checkLogin = async () => {
        setLoading(true)
        const result = await UserAuthen.checkLogin()

        if (result.success) {
            store.dispatch(setUser(result.data))
            setLoading(false)
        } else {
            store.dispatch(setUser({}))
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [currentRefresh])


    return (
        <div className={`${currentTheme ? "themelight" : "themedark"}`}>
            {loading ? <LoadingCom /> : <div>{children}</div>}
        </div>

    )
}

export default Provider