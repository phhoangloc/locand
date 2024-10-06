'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
    data: any[]
}

const Parallax = ({ data }: Props) => {

    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [isScroll, setIsScroll] = useState<boolean>(false)
    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScroll(true)
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
        parallax.current.scrollTop = scrollTop - ((e.pageY - startY))
    }

    useEffect(() => {
        parallaxChild.current?.clientWidth ? parallax.current.scrollLeft = `${(parallaxChild.current?.clientWidth - window.innerWidth) / 2}` : null
        parallaxChild.current?.clientHeight ? parallax.current.scrollTop = `${(parallaxChild.current?.clientHeight - window.innerHeight) / 2}` : null
    }, [parallaxChild.current?.clientWidth, parallaxChild.current?.clientHeight])


    const toPage = useRouter()

    return (
        <div ref={parallax}
            className='w-full h-screen scroll_none overflow-auto py-20 cursor-grab active:cursor-grabbing'
            onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setStartY(e.pageY), setScrollTop(e.currentTarget.scrollTop), setScrollLeft(e.currentTarget.scrollLeft) }}
            onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
            onMouseUp={() => { setMountDown(false), setIsScroll(false) }}
            onMouseLeave={() => { setMountDown(false), setIsScroll(false) }}>
            <div ref={parallaxChild} className='w-[4000px] flex flex-wrap justify-center ' >
                {data.length ? data.map((d, index) =>
                    <div key={index} className='flex flex-col justify-end max-w-[200px] sm:max-w-[275px] md:max-w-[325px] ' >
                        <div className='bg-white rounded select-none shadow-md overflow-hidden mx-4 hover:shadow-lg hover:scale-105 transition-all duration-500' onMouseUp={() => { isScroll === false ? toPage.push("/" + d.archive + "/" + d.slug) : null }}>
                            <div className=' overflow-hidden flex flex-col justify-center text-center m-auto relative p-4 '>
                                <div className="absolute top-0 left-0 w-full h-full z-[1]"></div>
                                {d.cover ?
                                    <Image className={`!select-none m-auto !w-full transition-all duration-300`} alt='img' width={500} height={500} src={process.env.ftp_url + d.cover.name} />
                                    : <div className='aspect-square flex flex-col justify-center'>NO IMAGE</div>}
                            </div>
                            <div className='p-4 m-auto'>
                                <p className='overflow-hidden truncate font-bold' title={d.name}>{d.name}</p>
                                <p className='opacity-75 text-sm'>{d.archive}</p>
                            </div>
                        </div>
                    </div>) :
                    <div> no data</div>
                }
            </div>

        </div>
    )

}

export default Parallax