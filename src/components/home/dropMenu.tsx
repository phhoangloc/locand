import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { IconDrop } from '../tool/icon/icon'
import PersonIcon from '@mui/icons-material/Person';
import Image from 'next/image'
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { useRouter } from 'next/navigation';
type Props = {}

const DropMenu = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {

        store.subscribe(() => setCurrentUser(store.getState().user))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()
    return (
        <div className="">
            {currentUser?.id ?
                <IconDrop
                    sx='bg-white'
                    icon={currentUser?.avata ? <Image src={process.env.ftp_url + currentUser.avata.name} fill className='object-cover cursor-pointer' alt='avata' /> : <PersonIcon className='!w-auto !h-full  cursor-pointer' />}
                    data={[
                        {
                            title: "Profile",
                            func: () => toPage.push("/profile")
                        },
                        {
                            title: "Log Out",
                            func: () => { localStorage.clear(), store.dispatch(setRefresh()) }
                        }
                    ]} /> :
                <IconDrop
                    sx='bg-white'
                    icon={<PersonIcon className='!w-auto !h-full p-2 cursor-pointer' />}
                    data={[
                        {
                            title: "Login",
                            func: () => toPage.push("/login")
                        },
                        {
                            title: "Sign Up",
                            func: () => toPage.push("/signup")
                        }
                    ]} />
            }
        </div>
    )
}

export default DropMenu