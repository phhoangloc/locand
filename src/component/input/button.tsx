"use client"
import { color } from '@/style/theme'
import React from 'react'
type Props = {
    onClick: () => void,
    name: string,
    disable?: boolean
}

const Button = ({ onClick, name, disable }: Props) => {
    return (
        <div style={{ width: "100px", height: "40px", margin: "auto", borderRadius: "5px", color: "white", background: color.main, }}>
            <button
                style={{ width: "100%", height: "100%", fontSize: "1rem", background: "none", border: "none", color: "inherit", cursor: "pointer", fontWeight: "bold" }}
                disabled={disable ? disable : false}
                onClick={() => onClick()}
            >
                {name}
            </button>
        </div>
    )
}

export default Button