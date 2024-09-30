'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import Input from '../tool/input/input'
import Button from '../tool/input/button'
import { setNotice } from '@/redux/reducer/noticeReducer'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ApiLogin } from '@/api/client'
type Props = {
    sx?: string,
    archive?: string
}
export const LoginRow = ({ archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)


    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const login = async (data: { username: string, password: string }) => {
        const result = await ApiLogin(data)
        console.log(result)
        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
            localStorage.token = "bearer " + result.result
            store.dispatch(setRefresh())
            toPage.push("/" + archive)
        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)
        }
    }

    return (
        <div className="dp-flex fd-col jc-center w100p h100h-55px">
            <div className={`w100p maxw575px mg-auto pd-5p bg br-5px`}>
                <h2 className='mg-5p-auto'>Log In</h2>
                <Input name="username" value={username} onChange={(e => setUsername(e))} />
                <Input name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e => setPassword(e))}
                    icon1={showPassword ?
                        <VisibilityOffIcon className='svg30px mg-auto cs-p' onClick={() => setShowPassword(!showPassword)} /> :
                        <RemoveRedEyeIcon className='svg30px mg-auto cs-p' onClick={() => setShowPassword(!showPassword)} />} />
                <div className='mg-5p-auto dp-flex'>
                    <Button name="login" onClick={() => login({ username, password })} sx='mg-right-5px' disable={username && password ? false : true} />
                    <Button onClick={() => toPage.push("signup")} name="Sign Up" sx='mg-right-5px' />
                </div>
            </div>
        </div>
    )
}

const Login = ({ sx, archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const login = async (data: { username: string, password: string }) => {
        setLoading(true)
        const result = await ApiLogin(data)

        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                localStorage.token = "bearer " + result.result
                store.dispatch(setRefresh())
                toPage.push("/" + archive)
            }, 3000)

        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                setLoading(false)
            }, 3000)
        }
    }

    return (
        <div className="flex flex-col justify-center w-full min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-slate-50  ">
            <div className={`w-full max-w-[575px] m-auto px-14 py-28 bg-white dark:bg-slate-800 rounded shadow`}>
                <h2 className='text-2xl font-bold text-center mb-14'>Log In</h2>
                <Input name="username" value={username} onChange={(e => setUsername(e))} />
                <Input name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e => setPassword(e))}
                    icon1={showPassword ?
                        <VisibilityOffIcon className='w-12 h-12 p-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                        <RemoveRedEyeIcon className='w-12 h-12 p-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />} />
                <div className='flex flex-col w-max mx-auto mt-10'>
                    <Button sx={`!my-1`} name={loading ? "..." : "Log In"} onClick={() => !loading && login({ username, password })} disable={loading ? true : username && password ? false : true} />
                    <Button sx="!my-1" onClick={() => toPage.push("signup")} name="Sign Up" />
                </div>
            </div>
        </div>
    )
}

export default Login