'use client'
import React, { useRef, useState } from 'react'
import store from '@/redux/store'
import { color } from '@/style/theme'
type Props = {
    onChange: (e: string) => void,
    name: React.ReactNode,
    value: string,
    type?: string,
    onfocus?: () => void,
    disabled?: boolean
}

const Input = ({ onChange, name, value, type, onfocus, disabled }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    update()

    const [focus, setFocus] = useState<boolean>(false)

    const box: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "50px",
        borderRadius: "5px"
    }
    const title: React.CSSProperties = {
        position: "absolute",
        top: "10px",
        left: "0px",
        padding: "0 5px",
        background: color.main,
        color: "white",
        fontSize: "15px",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        height: "40px",
        lineHeight: "40px",
        transition: "all 0.5s"
    }

    const titleFocus: React.CSSProperties = {
        top: 0,
        height: "20px",
        lineHeight: "20px",
        borderBottomLeftRadius: "0px",
        borderTopRightRadius: "5px",
        fontSize: "13px",
    }

    const inputBox: React.CSSProperties = {
        width: "100%",
        height: "40px",
        border: "none",
        marginTop: "10px",
        padding: "0px 5px 0",
        background: "inherit",
        fontSize: "0.9rem",
        color: currentTheme ? color.main : color.background_light,
        transition: "all 0.5s",
        boxSizing: "border-box",
    }

    const inputBoxForcus: React.CSSProperties = {
        height: "30px",
        marginTop: "20px",
        background: currentTheme ? color.background_light : color.background_dark,
        border: `2px solid ${color.main}`
    }

    return (
        <div style={box}>
            <p style={focus || value ? { ...title, ...titleFocus } : { ...title }}>{name}</p>
            <input
                style={focus || value ? { ...inputBox, ...inputBoxForcus } : { ...inputBox }}
                disabled={disabled ? disabled : false}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={(e) => { setFocus(true); onfocus && onfocus(); e.target.style.outline = 'none'; }}
                onBlur={() => setFocus(false)}
                type={type}
            ></input>
        </div >
    )
}

export default Input