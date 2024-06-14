'use client'
import React from 'react'
import Button from '@/component/input/button'
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type Props = {}

const NotFoundCom = (props: Props) => {
    const toPage = useRouter()
    return (
        <div className='mh100h dp-flex fd-col jc-center ta-center'>
            <h3>Opp! your is not Found!</h3>
            <Button name={<ArrowBackIcon />} onClick={() => toPage.back()} sx='bg-main w-mc mg-10px-auto pd-5px' />
            <Button name='Home' onClick={() => toPage.push("/home")} sx='bg-main w-mc mg-10px-auto pd-10px-20px' />
        </div>
    )
}

export default NotFoundCom