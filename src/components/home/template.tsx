import React from 'react'
import { useRouter } from 'next/navigation'
type Props = {}

const Template = (props: Props) => {
    const templates = [
        {
            name: "Landing Page",
            price: "free",
            link: ""
        },
        {
            name: "Blog",
            link: "blog"
        },
        {
            name: "Image",
            link: "template/tp_03"
        },
        {
            name: "Email",
            link: "template/tp_04"
        },
        {
            name: "Chat",
            link: "template/tp_05"
        },

    ]
    const toPage = useRouter()
    return (
        <div className=' bg-slate-100 dark:bg-slate-800'>
            <div className='max-w-[1200px] m-auto py-40 p-4'>
                <div className='text-3xl font-bold mb-10'>MY TEMPLATES</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  '>
                    {
                        templates.map((t, index) =>
                            <div key={index} className='aspect-square bg-white rounded cursor-pointer dark:bg-slate-700' onClick={() => toPage.push(t.link)}>
                                <div className='h-2/3 flex flex-col justify-center bg-slate-50 dark:bg-slate-900  text-center '> NO IMAGE</div>
                                <div className='h-1/3 p-4'>
                                    <p className='font-bold text-lg text-orange-500'>{t.name}</p>
                                    <p>{t.price ? t.price : "out of service"}</p>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Template