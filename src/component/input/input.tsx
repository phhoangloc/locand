'use client'
import React, { useRef, useState } from 'react'
import store from '@/redux/store'
type Props = {
    onChange: (e: string) => void,
    name: React.ReactNode,
    value: string,
    type?: string,
    onfocus?: () => void,
    disabled?: boolean,
    sx?: string,

}

const Input = ({ onChange, name, value, type, onfocus, disabled, sx }: Props) => {

    const [focus, setFocus] = useState<boolean>(false)

    const box: React.CSSProperties = {
        display: "flex",
        height: "50px",
        width: "100%",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "10px 0",
        transition: "all 0.25s",
    }

    const title: React.CSSProperties = {
        width: "120px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
    }

    const inputBox: React.CSSProperties = {
        width: "calc(100% - 102px)",
        height: "calc(100% - 2px)",
        border: "none",
        fontSize: "1rem",
        padding: "0 25px",
        // background: "white",
        boxSizing: "border-box",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        margin: "1px",
    }

    const inputBoxForcus: React.CSSProperties = {
        width: "calc(100% - 104px)",
        height: "calc(100% - 4px)",
        margin: "2px"
    }

    const inputBoxDisable: React.CSSProperties = {
        background: "inherit",
        color: "inherit",
    }
    return (
        <div className={sx} style={{ ...box }}>
            <p style={{ ...title }}>{name}</p>
            <input
                className='bglv1'
                style={disabled ? { ...inputBox, ...inputBoxDisable } : focus || (value) ? { ...inputBox, ...inputBoxForcus } : { ...inputBox }}
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