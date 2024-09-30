'use client'
import React, { useState, useEffect, useRef } from 'react'

type Props = {
    w?: number,
    h?: number,
    r?: number,
    lw?: number,
    strcl?: string
    currentScroll: number
}

const IconLoading = ({ currentScroll, w, h, r, lw, strcl }: Props) => {


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
        ctx.strokeStyle = strcl || "#336699";
        ctx.stroke();
    }, [x, y, ra, lw, currentScroll]);

    return (
        <canvas width={w ? w + "px" : "50px"} height={h ? h + "px" : "50px"} ref={canvasRef} style={{ transform: "rotate(-90deg)", margin: "auto", width: w ? w + "px" : "50px", height: h ? h + "px" : "50px" }} />
    )
}

export default IconLoading