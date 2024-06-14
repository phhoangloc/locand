'use client'
import { NoUserAuthen } from '@/api/NoUserAuthen'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import LoadingCom from '@/component/admin/fixed/loadingCom'
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
    const [item, setItem] = useState<any>({})
    // const [loading, setLoading] = useState<boolean>(true)
    const getOneItem = async (genre: string, slug: string) => {
        // setLoading(true)
        const result = await NoUserAuthen.getOneItem(genre, slug)
        if (result.success) {
            setItem(result.data[0])
            // setLoading(false)
        } else {
            setItem({})
            // setLoading(false)
        }
    }

    useEffect(() => {
        getOneItem("blog", params.slug)
    }, [])

    return (
        <div className='grid_box'>
            <div className='animation-change-page bglv1 of-hidden'></div>
            <div className='xs12 md6'>
                <div className='ps-re h300px ps-st top-100vh-300px mg-5p'>
                    {item.cover?.name ?
                        <Image src={"/cover/" + item.cover?.name}
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
                    <div className='h100h dp-flex fd-col jc-center ta-center fos-90p bor-bot-1px'>
                        <h1>{item.name}</h1>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: item.detail }} />
                </div>
            </div>
        </div>
    )
}

export default Page