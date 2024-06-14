'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import moment from 'moment'
import { UserAuthen } from '@/api/UserAuthen'
import { useRouter } from 'next/navigation'
type Props = {}

const Page = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }
    useEffect(() => {
        update()
    })

    const [items, setItems] = useState<any[]>([])
    const getItems = async (p: string, a: string, s: string, sk: number | undefined, li: number | undefined) => {
        const result = await UserAuthen.getItem(p, a, s, sk, li)
        if (result.success) {
            setItems(result.data)
        } else {
            setItems([])
        }
    }
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, "blog", "", undefined, undefined)
    }, [currentUser.position])

    const toPage = useRouter()
    return (
        <div className='bglv1 pd-5p br-5px'>
            <h3 className='mg-bot-20px'>Blogs
                <span className='fos-70p  hover-link mg-0px-10px cs-p' onClick={() => toPage.push("/admin/blog/new")} >make a new blog</span>
            </h3>
            {items.map((item, index) =>
                <div key={index} className=' pd-10px bor-bot-1px borC-main mg-10px-0px cs-p'
                    onClick={() => toPage.push("/admin/blog/" + item.slug)}>
                    <h4>{item.name}</h4>
                    <p className='fos-70p'>{moment(item.createDate).format('MM/DD HH:mm')}</p>
                </div>)}
        </div>
    )
}

export default Page