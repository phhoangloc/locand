"use client"
import React from 'react'
type Props = {
    onClick: () => void,
    name: React.ReactNode,
    disable?: boolean,
    sx?: string,
    style?: React.CSSProperties
}

const Button = ({ onClick, name, disable, sx, style }: Props) => {

    const box: React.CSSProperties = {
        width: "max-content",
        padding: "10px 20px",
        borderRadius: "5px"

    }
    const button: React.CSSProperties = {
        fontSize: "1rem",
        background: "none",
        border: "none",
        color: "inherit",
        cursor: "pointer",
        fontWeight: "bold"
    }
    return (
        <div className={sx} style={{ ...box, ...style }}>
            <button
                style={button}
                disabled={disable ? disable : false}
                onClick={() => onClick()}
            >
                {name}
            </button>
        </div>
    )
}

export default Button