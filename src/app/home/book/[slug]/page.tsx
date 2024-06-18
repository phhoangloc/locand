'use client'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@/component/input/button'
import Accordion from '@/component/tool/accordion'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
    const [item, setItem] = useState<any>({})
    const [chapters, setChapters] = useState<{ title: string, content: string }[]>([])
    const [chapterIndex, setChapterIndex] = useState<number>(0)
    // const [loading, setLoading] = useState<boolean>(true)
    const getOneItem = async (genre: string, slug: string) => {
        const result = await NoUserAuthen.getOneItem(genre, slug)
        if (result.success) {
            setItem(result.data[0])
        } else {
            setItem({})
        }
    }

    useEffect(() => {
        getOneItem("book", params.slug)
    }, [])

    return (
        <div className='grid_box'>
            <div className='xs12 md6'>
                <div className='ps-re mh300px ps-st top-100vh-300px mg-5p'>
                    {

                        item?.cover?.name ?
                            <Image src={"/cover/" + item?.cover?.name}
                                fill alt='cover'
                                draggable="false"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                                sizes="100"
                                priority={false} /> :
                            <Image src={"/img/defaultImg.jpg"}
                                fill alt='cover'
                                draggable="false"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                }}
                                sizes="100"
                                priority={false} />
                    }

                </div>
            </div>
            <div className='xs12 md6'>
                <div className='bglv1 pd-5p ta-j'>
                    <div className='h100h dp-flex fd-col jc-center ta-center fos-90p'>
                        <h1>{item?.name}</h1>
                    </div>
                    <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: item?.detail }} />
                    <Button name="read online" onClick={() => setChapters(item.chapters)} sx='bg-main mg-10px-0px' />
                </div>
            </div>

            {
                chapters.length ?
                    <div className='ps-f w100p h100p top-0px of-auto scrollbar-none filter-brightness-50p zi-3' >
                        <div className={`w100p mw-768px mg-auto content-gradiant pd-5p `}>
                            <h2 className='hover-link cs-p fow-b ta-center mg-20px-0px' onClick={() => setChapters([])}> {item.name}</h2>
                            <p className='ta-center mg-5px-0px' > {item.author}</p>
                            <div className='dp-flex w-100p mg-auto'>
                                <Accordion
                                    title={"chapter " + Number(chapterIndex + 1)}
                                    data={chapters.map((chapter, index) => {
                                        return {
                                            name: "chapter " + Number(index + 1) + " " + chapter.title,
                                            func: () => { setChapterIndex(index) }
                                        }
                                    })}
                                    width='100%' />
                            </div>
                            <h3 className='mg-top-50px'>{chapters[chapterIndex]?.title}</h3>
                            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: chapters[chapterIndex]?.content }}></div>
                            <div className='dp-flex w-mc mg-10px-auto'>
                                {chapterIndex === 0 ? null : <div className="svg50 mg-10px-0px cs-p"><SkipPreviousIcon onClick={() => setChapterIndex(p => p - 1)} /></div>}
                                <Accordion
                                    title={"chapter " + Number(chapterIndex + 1)}
                                    data={chapters.map((chapter, index) => {
                                        return {
                                            name: "chapter " + Number(index + 1),
                                            func: () => { setChapterIndex(index) }
                                        }
                                    })}
                                    width='150px' />
                                {chapterIndex >= chapters.length - 1 ? null : <div className="svg50 mg-10px-0px cs-p"><SkipNextIcon onClick={() => setChapterIndex(p => p + 1)} /></div>}
                            </div>
                            <div className='bg-main w-mc mg-auto br-5px '><Button name={<ArrowBackIcon />} onClick={() => setChapters([])} /></div>
                        </div>
                    </div> : null
            }

        </div>
    )
}

export default Page