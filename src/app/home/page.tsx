'use client'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import Parallax from '@/component/display/parallax'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {

    const [book, setBook] = useState<any[]>([])
    const [blog, setBlog] = useState<any[]>([])

    const getData = async (a: string) => {
        const result = await NoUserAuthen.getItem(a, undefined, undefined)
        if (result.success) {
            a === "book" && setBook(result.data)
            a === "blog" && setBlog(result.data)
        } else {
            setBook([])
            setBlog([])
        }
    }

    useEffect(() => {
        getData("blog")
        getData("book")
    }, [])
    return (
        <Parallax data={[...book, ...blog]} />
    )
}

export default Page