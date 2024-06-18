'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@/component/tool/accordion'
import RemoveIcon from '@mui/icons-material/Remove';

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
    const [author, setAuthor] = useState<string>("")
    const [chapters, setChapters] = useState<{ title: string, content: string }[]>([])
    const [chapterIndex, setChapterIndex] = useState<number>(-1)
    const [cover, setCover] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")
    const [contentChapter, setContentChapter] = useState<string>("")
    const [newContentChapter, setNewContentChapter] = useState<string>("")
    const [titleChapter, setTitleChapter] = useState<string>("")

    const body = {
        name,
        slug,
        author,
        chapters,
        detail: newContent || content,
    }
    const toPage = useRouter()

    const getItem = async (p: string, a: string, s: string) => {
        const result = await UserAuthen.getOneItembySlug(p, a, s)
        if (result.success && result.data[0]) {
            setId(result.data[0]._id)
            setName(result.data[0].name)
            setSlug(result.data[0].slug)
            setAuthor(result.data[0].author)
            setChapters(result.data[0].chapters)
            setContent(result.data[0].detail)
        } else {
            setId("")
            setName("")
            setContent("")
            setChapters([])
        }
    }

    useEffect(() => {
        getItem(currentUser.position, "book", params.slug)
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
        // console.log(body)
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

    useEffect(() => {
        chapterIndex !== -1 ? chapters[chapterIndex] = { title: titleChapter, content: newContentChapter || contentChapter } : null
    }, [chapterIndex, titleChapter, newContentChapter])

    return (
        loading ? <div>loading...</div> :
            <>
                <div className={"bglv1 pd-5p br-5px mg-20px-0px"}>
                    <h3>{name ? name : "new title"}</h3>
                    {slug ?
                        <Link
                            href={'/home/book/preview_ad31'}
                            target='_blank'>
                            <p className='hover-link' onClick={() => { updateItem(currentUser.position, "book", "666fcc741adeb8865d77c8cd", { name, slug: "preview_ad31", detail: newContent || content, chapters }) }}>{'/home/book/preview_ad31'}</p>
                        </Link> :
                        <Link
                            href={'/home/book/preview_ad31'}
                            target='_blank'>
                            <p className='hover-link' onClick={() => { updateItem(currentUser.position, "book", "666fcc741adeb8865d77c8cd", { name, slug: "preview_ad31", detail: newContent || content, chapters },) }}>preview</p>
                        </Link>
                    }

                </div>
                <div className={"bglv1 pd-5p br-5px mg-20px-0px"}>
                    <Button onClick={() => toPage.push("/admin/book/new")} name={`make a new book`} sx="bg-main" />
                    <Input name="title" onChange={(v) => setName(v)} value={name} sx='bg-main' />
                    <Input name="slug" onChange={(v) => setSlug(v)} value={slug} sx='bg-main' />
                    <Input name="author" onChange={(v) => setAuthor(v)} value={author} sx='bg-main' />
                    <div className='dp-flex'>
                        <Button name="intro" onClick={() => { setChapterIndex(-1) }} style={{ height: "40px", margin: "auto 5px", boxShadow: "0px 0px 2px  #888", }} />
                        <Accordion
                            title={chapters[chapterIndex]?.title || "chapter"}
                            data={chapters.map((chapter, index) => {
                                return {
                                    name: chapter.title,
                                    func: () => { setChapterIndex(index), setTitleChapter(chapter.title), setContentChapter(chapter.content) }
                                }
                            })}
                            width='150px' />
                        <div className="h40px mg-10px-0px svg50 cs-p">
                            <AddIcon onClick={() => { setChapters(p => [...p, { title: "new chapter", content: "" }]) }} />
                            {chapterIndex !== -1 && <RemoveIcon onClick={() => { setChapters(p => p.filter((chapter, index) => index !== chapterIndex)); setChapterIndex(-1) }} />}
                        </div>
                    </div>

                    {chapterIndex === -1 ? null :
                        <Input name={"chapter " + Number(chapterIndex + 1)} onChange={(v: any) => setTitleChapter(v)} value={titleChapter} sx="bg-main" />
                    }
                    {chapterIndex === -1 ?
                        <TextAreaTool onChange={(v: any) => setNewContent(v)} value={content} sx="bg-main" /> :
                        <TextAreaTool onChange={(v: any) => setNewContentChapter(v)} value={contentChapter} sx="bg-main" />
                    }
                    <div className='dp-flex'>
                        {id ?
                            <Button name='save' onClick={() => updateItem(currentUser.position, "book", id, body)} sx="bg-main mg-5px" /> :
                            <Button sx="bg-main" name='create' onClick={() => createNewItem(currentUser.position, "book", body)} />}
                        {id ? <Button name='delete' onClick={() => deleteItem(currentUser.position, "book", id)} sx="bg-main mg-5px" /> : null}
                    </div>
                </div>
            </>
    )

}

export default Page