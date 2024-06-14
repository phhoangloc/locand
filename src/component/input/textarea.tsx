'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import store from '@/redux/store'

type Props = {
    onChange: (e: string) => void,
    onFocus?: () => void,
    name: string,
    value: string,
    n: number,
    background?: string
    color?: string
}

const TextArea = ({ name, onChange, value, n, onFocus, background, color }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const inputRef = useRef<any>()

    const [focus, setFocus] = useState<boolean>(false)

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `${value}` : null
    }, [n])

    const box: React.CSSProperties = {
        display: "flex",
        height: "50px",
        width: "100%",
        borderRadius: "10px",
        background: color,
        overflow: "hidden",
        border: "2px solid",
        borderColor: "transparent",
        transition: "all 0.25s",

    }
    const boxFocus: React.CSSProperties = {
        background: background,
        borderColor: background
    }

    const title: React.CSSProperties = {
        width: "max-content",
        lineHeight: "26px",
        padding: "0px 25px",
        margin: "10px 0",
        color: background,
        fontWeight: "bold",
    }

    const titleFocus: React.CSSProperties = {
        color: 'white',
    }

    const inputBox: React.CSSProperties = {
        width: "100%",
        height: "100%",
        border: "none",
        fontSize: "1rem",
        padding: "12.5px 25px",
        background: "inherit",
        transition: "all 0.25s",
        color: "inherit",
        overflow: "scroll"
    }

    const inputBoxForcus: React.CSSProperties = {
        background: color
    }

    return (
        <div style={focus || value ? { ...box, ...boxFocus } : { ...box }}>
            <p style={focus || value ? { ...title, ...titleFocus } : { ...title }}>{name}</p>
            <div style={focus || value ? { ...inputBox, ...inputBoxForcus } : { ...inputBox }} ref={inputRef}
                contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={(e) => { setFocus(true), e.target.style.outline = 'none'; onFocus && onFocus() }}
                onBlur={() => setFocus(false)}
            >
            </div>
        </div>
    )
}

export default TextArea