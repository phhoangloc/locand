'use client'
import React, { useRef, useEffect, useState } from 'react'
import store from '@/redux/store'
import { transform } from 'next/dist/build/swc'
type Props = {
    w?: number,
    h?: number,
    r?: number,
    lw?: number,
    strcl?: string
}

const ScrollIcon = ({ w, h, r, lw, strcl }: Props) => {

    const [currentScroll, setCurrentScroll] = useState<number>(store.getState().scroll)

    const update = () => {
        store.subscribe(() => setCurrentScroll(store.getState().scroll))
    }

    useEffect(() => {
        update()
    }, [])

    const canvasRef = useRef<any>("")

    const [x, setX] = useState<number>(w ? w / 2 : 25)
    const [y, setY] = useState<number>(w ? w / 2 : 25)
    const [ra, setR] = useState<number>(r ? r : 20)

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(x, y, ra, 0, currentScroll * 2 * Math.PI);
        ctx.lineWidth = lw || 5;
        ctx.strokeStyle = strcl || "#888";
        // ctx.fillStyle = strcl || "#888";
        ctx.stroke();
        // ctx.fill(); // Sử dụng lệnh này để tô màu hình tròn
    }, [x, y, ra, lw, currentScroll]);

    return (
        <canvas width={w ? w + "px" : "50px"} height={h ? h + "px" : "50px"} ref={canvasRef} style={{ transform: "rotate(-90deg)", margin: "5px" }} />
    )
}

export default ScrollIcon