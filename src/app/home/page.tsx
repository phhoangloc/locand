'use client'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import Parallax from '@/component/display/parallax'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {

    const [data, setData] = useState<any[]>([])

    const getData = async (a: string) => {
        const result = await NoUserAuthen.getItem(a, undefined, undefined)
        if (result.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        getData("blog")
    }, [])
    return (
        <Parallax data={data} />
    )
}

export default Page