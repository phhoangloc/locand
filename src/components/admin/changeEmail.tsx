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
import { ApiItemUser, ApiUpdateItem } from '@/api/user'
import { ApiItem } from '@/api/client'
import { storage } from 'googleapis/build/src/apis/storage'
type Props = {
    sx?: string,
    archive?: string
}

export const ChangePasword = ({ sx, archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [confirmCode, setConfirmCode] = useState<string>("")
    const [newPaasword, setNewPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const changePassword = async (confirmCode: string, data: { password: string }) => {

        const resultUserById = await ApiItemUser({ position: currentUser.position, archive: "user", id: currentUser.id })
        const userbyId = resultUserById?.data
        const confirmCodeOfUserById = userbyId[0]?.confirmCode

        const result = confirmCodeOfUserById === confirmCode && await ApiUpdateItem({ position: currentUser.position, archive: "user", id: currentUser.id }, data)


        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                localStorage.clear()
                toPage.push("/admin")
            }, 3000)

        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
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
                <Input name="confirmCode" value={confirmCode} onChange={(e => setConfirmCode(e))} />
                <Input name="new email"
                    type={showPassword ? "text" : "password"}
                    value={newPaasword}
                    onChange={(e => setNewPassword(e))}
                    icon1={showPassword ?
                        <VisibilityOffIcon className='!w-12 !h-12 p-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} /> :
                        <RemoveRedEyeIcon className='!w-12 !h-12 p-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />} />
                <div className='flex flex-col w-max mx-auto mt-10'>
                    <Button sx={`!my-1`} name={loading ? "..." : "Change Password"} onClick={() => !loading && changePassword(confirmCode, { password: newPaasword })} disable={loading ? true : confirmCode && newPaasword ? false : true} />
                </div>
            </div>
        </div>
    )
}



const ChangeEmail = ({ sx, archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [confirmCode, setConfirmCode] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("")

    const changeEmail = async (confirmCode: string, data: { email: string }) => {

        const resultUserById = await ApiItemUser({ position: currentUser.position, archive: "user", id: currentUser.id })
        const userbyId = resultUserById?.data
        const confirmCodeOfUserById = userbyId[0]?.confirmCode

        const result = confirmCodeOfUserById === confirmCode && await ApiUpdateItem({ position: currentUser.position, archive: "user", id: currentUser.id }, data)

        console.log(confirmCodeOfUserById)
        console.log(confirmCode)

        if (result.success) {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            }, 3000)

        } else {
            store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
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
                <Input name="confirmCode" value={confirmCode} onChange={(e => setConfirmCode(e))} />
                <Input name="new email"
                    value={newEmail}
                    onChange={(e => setNewEmail(e))} />
                <div className='flex flex-col w-max mx-auto mt-10'>
                    <Button sx={`!my-1`} name={loading ? "..." : "Change Email"} onClick={() => !loading && changeEmail(confirmCode, { email: newEmail })} disable={loading ? true : confirmCode && newEmail ? false : true} />
                </div>
            </div>
        </div>
    )
}

export default ChangeEmail