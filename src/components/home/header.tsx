'use client'
import React, { useState, useEffect } from 'react'


import store from '@/redux/store';
import { setMenu } from '@/redux/reducer/MenuReduce';
import { IconDrop } from '../tool/icon/icon';
import { useRouter } from 'next/navigation';
import DropMenu from './dropMenu';

type Props = {}

const Header = (props: Props) => {

    const toPage = useRouter()
    return (
        <div className='w-full mb-5'>
            <div className='flex justify-between max-w-[1200px] h-12 m-auto border-b-2 border-orange-500 '>
                <p className='text-2xl font-bold h-full flex flex-col justify-center cursor-pointer' onClick={() => toPage.push("/")}>LOCAND</p>
                <DropMenu />
            </div>
        </div>

    )
}

export default Header