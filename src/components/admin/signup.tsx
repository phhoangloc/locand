'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Input from '../tool/input/input'
import Button from '../tool/input/button'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ApiSignup } from '@/api/client'
// import { NoUserAuthen } from '@/api/NoUserAuthen'
import { setNotice } from '@/redux/reducer/noticeReducer'
type Props = {
    // archive: string
}
const Signup = ({ }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const toPage = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [email, setEmail] = useState<string>("")

    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    useEffect(() => {
        validateForm && validateForm();
    }, [username, password, email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (username.length != 0 && 6 > username.length) {
            errors.username = `usernname must be longer than 6 character`

        }
        if (username) {
            const isusername = await fetch("/api/checkuser?username=" + username)
                .then((res) => res.json())
                .then((data) => data)
            if (isusername) { errors.username = "username is Exited" }
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = 'this email is not valid';
        }
        if (email) {
            const isEmail = await fetch("/api/checkuser?email=" + email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail) { errors.email = "email is existed" }
        }
        if (password.length != 0 && password.length < 6) {
            errors.password = `password must be longer than 6 character`;
        }

        setIsErrors(Object.keys(errors).length || username === "" || password === "" || email === "" ? true : false);
        setErrors(errors)
    }
    const signup = async (body: { username: string, password: string, email: string }) => {
        setLoading(true)
        const result = await ApiSignup(body)
        console.log(result)
        if (result.success) {
            setUsername("")
            setPassword("")
            setEmail("")
            store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                toPage.push("login")
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
        <div className="flex flex-col justify-center w-full min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-slate-50">
            <div className={`w-full max-w-[575px] m-auto px-14 py-28 bg-white dark:bg-slate-800 rounded shadow`}>
                <h2 className='text-2xl font-bold text-center mb-14'>Sign Up</h2>
                <Input name='username' value={username} onChange={(data) => setUsername(data)} warn={Error.username} />
                <Input type={showPassword ? "text" : "password"}
                    name='password'
                    value={password} onChange={(data) => setPassword(data)}
                    icon1={showPassword ?
                        <VisibilityOffIcon className='w-12 h-12 p-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                        <RemoveRedEyeIcon className='w-12 h-12 p-3 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
                    warn={Error.password} />
                <Input name='email' value={email} onChange={(data) => setEmail(data)} warn={Error.email} />
                <div className='flex flex-col w-max mx-auto mt-10'>
                    <Button onClick={() => signup({ username, password, email })} name={loading ? "..." : "Sign Up"} disable={loading ? true : isError} sx="!my-1" />
                    <Button onClick={() => toPage.push("login")} name="Log In" sx="!my-1" />
                </div>
            </div>
        </div>
    )
}

export default Signup