'use client'
import React, { useState, useEffect } from 'react'
import Login from '@/components/admin/login'
import Signup from '@/components/admin/signup'
import { Archive, ArchivePic } from '@/components/admin/archive'
import store from '@/redux/store'
import { EditDetailById } from '@/components/admin/detail'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })
    switch (params.archive) {
        case "login":
            return (
                <Login archive='admin' />
            )
        case "signup":
            return (
                <Signup />
            )

        case "blog":
            return (
                <Archive genre={params.archive} />
            )
        case "user":
            return (
                currentUser?.position === "admin" ? <Archive genre="user" /> : <EditDetailById path1='user' path2={currentUser?.id} />
            )
        case "media":
            return (
                <ArchivePic edit={true} />
            )
        case "profile":
            return (
                <EditDetailById path1={"user"} path2={currentUser.id} />
            )

        default:
            return "NOT FOUND"
    }

}

export default Page