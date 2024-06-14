'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'

import Input from '@/component/input/input'
import Button from '@/component/input/button'

import { NoUserAuthen } from '@/api/NoUserAuthen'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import { setNotice } from '@/redux/reducer/noticeReducer'

type Props = {
    archive: string
}
const Login = ({ archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (data: { username: string, password: string }) => {
        const result = await NoUserAuthen.login(data)
        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            localStorage.token = "bearer " + result.data.token
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                store.dispatch(setRefresh())
                toPage.push("/" + archive)
            }, 3000)

        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
        }
    }

    return (
        <div className={`w90p mw-575px mg-auto bglv1 pd-5p br-5px bs-2px`}>
            <h2 className='mg-bot-10px'>Log In</h2>
            <Input sx="bg-main" name="username" value={username} onChange={(e => setUsername(e))} />
            <Input sx="bg-main" name="password" type='password' value={password} onChange={(e => setPassword(e))} />
            <div className='dp-flex'>
                <Button name="Log In" onClick={() => login({ username, password })} sx='bg-main w-mc mg-5px pd-10px-20px' />
                <Button name="Sign UP" onClick={() => toPage.push("/signup")} sx='bg-main w-mc mg-5px pd-10px-20px' />
            </div>

        </div>
    )
}

export default Login