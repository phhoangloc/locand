'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { setUser } from '../reducer/UserReduce'
import { ApiCheckLogin } from '@/api/user'
// import Loading from '@/component/home/loading'

type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const update = () => {
        //     store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))

    }
    useEffect(() => {
        update()
    })

    const isLogin = async () => {
        setLoading(true)
        const result = await ApiCheckLogin()
        if (result.success) {
            store.dispatch(setUser(result.data))
            setLoading(false)
        } else {
            store.dispatch(setUser({}))
            setLoading(false)
        }
    }

    useEffect(() => {
        isLogin()
    }, [currentRefresh])

    if (loading) {
        return (<div>...</div>)
    }
    return children
}

export default Provider