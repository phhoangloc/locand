'use client'
import { ApiItem } from '@/api/client'
import Detail from '@/components/home/detail'
import React, { useEffect, useState } from 'react'

type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    const [data, setData] = useState<any>()
    const getItemBySlug = async () => {
        const result = await ApiItem({ archive: params.archive, slug: params.slug })
        if (result.success && result.data[0]) {
            setData(result.data[0])
        } else {
            setData("")
        }
    }
    useEffect(() => {
        getItemBySlug()
    }, [])
    return (
        <Detail data={data} />
    )
}

export default Page