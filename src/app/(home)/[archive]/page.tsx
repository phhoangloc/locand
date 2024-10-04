'use client'
import React, { useState, useEffect } from 'react'
import { ApiItem } from '@/api/client'
import NotFound from '@/components/admin/notfound'
import Loading from '@/components/tool/loading/loading'
type Props = {
    params: { archive: string }
}

const page = ({ params }: Props) => {
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)

    const getContent = async () => {
        setLoading(true)
        const result = await ApiItem({ archive: "page", slug: params.archive })
        if (result.success && result.data[0]) {
            setContent(result.data[0].content)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }
    useEffect(() => {
        getContent()
    }, [])
    return (
        loading ? <Loading /> :
            content ? <div className="w-full min-h-screen dangerous_box" dangerouslySetInnerHTML={{ __html: content }}>
            </div> :
                <div className='min-h-screen flex flex-col justify-center'>
                    <NotFound />
                </div>
    )
}

export default page