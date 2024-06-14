'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Button from '@/component/input/button'
type Props = {
    children: React.ReactNode
}

const Authen = ({ children }: Props) => {
    const toPage = useRouter()
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    return (
        currentUser?._id ?
            <div className='mw-1200px mg-auto mh100h dp-flex fd-col jc-center ta-center'>
                {children}
            </div>
            :
            <div className='mw1200px mg-auto mh100h dp-flex fd-col jc-center ta-center'>
                <h3>you havent logged in yet</h3>
                <Button name='Login' onClick={() => toPage.push("/login")} sx='bg-main w-mc mg-10px-auto pd-10px-20px' />
            </div>
    )
}

export default Authen