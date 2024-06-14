'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
type Props = {
    data?: any[]
}

const Parallax = ({ data }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })


    const parallax: any = useRef()
    const parallaxChild: any = useRef()

    const [hover, setHover] = useState<boolean>(false)
    const [i, setI] = useState<number>(-1)

    const [mouseDown, setMountDown] = useState<boolean>(false)
    const [startX, setStartX] = useState<number>(0)
    const [scrollTop, setScrollTop] = useState<number>(0)
    const [scrollLeft, setScrollLeft] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const onHandleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        parallax.current.scrollLeft = scrollLeft - ((e.pageX - startX))
        parallax.current.scrollTop = scrollTop - ((e.pageY - startY))
    }

    useEffect(() => {
        parallaxChild.current?.clientWidth ? parallax.current.scrollLeft = `${(parallaxChild.current?.clientWidth - window.innerWidth) / 2}` : null
        parallaxChild.current?.clientHeight ? parallax.current.scrollTop = `${(parallaxChild.current?.clientHeight - window.innerHeight) / 2}` : null
    }, [parallaxChild.current?.clientWidth, parallaxChild.current?.clientHeight])


    const toPage = useRouter()

    const parallaxBox: React.CSSProperties = {
        width: "100%",
        height: "100vh",
        overflow: "auto",
        userSelect: "none",
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center"
    }
    const flexBox: React.CSSProperties = {
        display: "flex",
        width: "3000px",
        height: "max-content",
        flexWrap: "wrap",
        justifyContent: "center",
        cursor: mouseDown ? 'grabbing' : 'grab',
    }

    const itemBox: React.CSSProperties = {
        width: "max-content",
        minWidth: "50px",
        maxWidth: "350px",
        height: "200px",
        margin: "20px",
        borderRadius: "5px",
        padding: "5px",
        cursor: "pointer",
        transition: "all 0.25s",
        boxShadow: "1px 1px 5px -2px #444",
    }

    const itemBoxHover: React.CSSProperties = {
        transform: "scale(1.15)",
        boxShadow: "1px 1px 30px -15px #444",

    }

    const imageBox: React.CSSProperties = {
        width: "100%",
        height: "80%",
        position: "relative",
        zIndex: 0,
    }

    const pBox: React.CSSProperties = {
        width: "100%",
        lineHeight: "1.5",
        userSelect: 'none',
        fontSize: "0.9rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }

    return (
        <div ref={parallax}
            className='scrollbar-none'
            style={parallaxBox}
            onMouseDown={(e) => { setMountDown(true), setStartX(e.pageX), setStartY(e.pageY), setScrollTop(e.currentTarget.scrollTop), setScrollLeft(e.currentTarget.scrollLeft) }}
            onMouseMove={(e) => { mouseDown && onHandleMouseMove(e) }}
            onMouseUp={() => { setMountDown(false) }}
            onMouseLeave={() => setMountDown(false)}>
            <div className={`of-hidden ${currentTheme ? "parallax-gradiant-light" : "parallax-gradiant-dark"}`} ref={parallaxChild} style={flexBox}>
                {
                    data ? data.map((item: any, index: number) =>
                        <div className={`bglv1 animation-fdown-toup`}
                            key={index}
                            style={hover && i === index ? { ...itemBox, ...itemBoxHover } : { ...itemBox }}
                            onDoubleClick={() => item.genre && item.slug && toPage.push(`/home/${item.genre}/${item.slug}`)}
                            onMouseEnter={() => { setHover(true), setI(index) }}
                            onMouseLeave={() => { setHover(false), setI(-1) }}>
                            <div style={imageBox}>
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
                            <div>
                                <p className='tw-no'
                                    title={item.name}
                                    style={pBox}
                                >{item.name}</p>
                                <p
                                    style={{ ...pBox, fontSize: "75%", textAlign: "center", opacity: "0.75" }}
                                >{item.genre}</p>
                            </div>
                        </div>) : null
                }
            </div>
        </div>
    )

}

export default Parallax