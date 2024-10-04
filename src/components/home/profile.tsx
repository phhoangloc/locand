import { useState, useEffect } from "react"
import React from 'react'
import store from "@/redux/store"
import Image from "next/image"
type Props = {}

const Profile = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))

    }
    useEffect(() => {
        update()
    })
    return (
        <div className="w-full max-w-[1200px] m-auto min-h-screen">
            <div className="h-96 relative">
                {currentUser.cover?.name ? <Image src={process.env.ftp_url + currentUser.cover?.name} fill className="object-cover" alt="cover" /> : <div>No IMAGE</div>}
            </div>
            <div className="w-max m-auto text-center mt-2">
                <div className="w-40 aspect-square relative rounded overflow-hidden">
                    {currentUser.avata?.name ? <Image src={process.env.ftp_url + currentUser.avata?.name} width={500} height={500} className="w-auto h-full m-auto" alt="avata" /> : <div>No IMAGE</div>}
                </div>
                <div className="text-xl font-bold">{currentUser.username}</div>
                <div className="opacity-75 text-sm">{currentUser.position}</div>
            </div>
        </div>
    )
}

export default Profile