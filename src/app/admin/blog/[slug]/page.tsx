'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
import Accordion from '@/component/tool/accordion'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NoUserAuthen } from '@/api/NoUserAuthen'
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(false)

    const [id, setId] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [cover, setCover] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")

    const body = {
        name,
        slug,
        detail: newContent || content,
    }
    const toPage = useRouter()

    const getItem = async (p: string, a: string, s: string) => {
        const result = await UserAuthen.getOneItembySlug(p, a, s)
        if (result.success && result.data[0]) {
            setId(result.data[0]._id)
            setName(result.data[0].name)
            setSlug(result.data[0].slug)
            setContent(result.data[0].detail)
        } else {
            setId("")
            setName("")
            setContent("")
        }
    }

    useEffect(() => {
        getItem(currentUser.position, "blog", params.slug)
    }, [])

    const createNewItem = async (p: string, a: string, body: any) => {
        if (body.name && body.slug) {
            const result = await UserAuthen.createItem(p, a, body)
            if (result.success) {
                toPage.push("/admin/" + a + "/" + params.slug)
            }
        } else {
            alert("you must input title and slug")
        }
    }

    const updateItem = async (p: string, a: string, id: string, body: any) => {
        const result = await UserAuthen.updateItem(p, a, id, body)
        if (result.success) {
            toPage.push("/admin/" + a + "/" + params.slug)
        }
    }

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            toPage.push("/admin/" + a + "/")
        }
    }


    return (
        loading ? <div>loading...</div> :
            <>
                <div className={"bglv1 pd-5p br-5px mg-20px-0px"}>
                    <h3>{name ? name : "new title"}</h3>
                    {slug ?
                        <Link
                            href={'/home/blog/preview_ad31'}
                            target='_blank'>
                            <p className='hover-link' onClick={() => { updateItem(currentUser.position, "blog", "666bb968680cd4469b034ade", { name, slug: "preview_ad31", detail: newContent || content },) }}>{'/home/blog/preview_ad31'}</p>
                        </Link> :
                        <Link
                            href={'/home/blog/preview_ad31'}
                            target='_blank'>
                            <p className='hover-link' onClick={() => { updateItem(currentUser.position, "blog", "666bb968680cd4469b034ade", { name, slug: "preview_ad31", detail: newContent || content },) }}>preview</p>
                        </Link>
                    }

                </div>
                <div className={"bglv1 pd-5p br-5px mg-20px-0px"}>
                    <Button onClick={() => toPage.push("/admin/blog/new")} name={`make a new blog`} sx="bg-main" />
                    <Input name="title" onChange={(v) => setName(v)} value={name} sx='bg-main' />
                    <Input name="slug" onChange={(v) => setSlug(v)} value={slug} sx='bg-main' />
                    <TextAreaTool onChange={(v: any) => setNewContent(v)} value={content} sx="bg-main" />
                    <div className='dp-flex'>
                        {id ?
                            <Button name='save' onClick={() => updateItem(currentUser.position, "blog", id, body)} sx="bg-main mg-5px" /> :
                            <Button sx="bg-main" name='create' onClick={() => createNewItem(currentUser.position, "blog", body)} />}
                        {id ? <Button name='delete' onClick={() => deleteItem(currentUser.position, "blog", id)} sx="bg-main mg-5px" /> : null}
                    </div>
                </div>
            </>
    )


}

export default Page