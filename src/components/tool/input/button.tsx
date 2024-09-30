"use client"
import React, { useState } from 'react'
type Props = {
    onClick: () => void,
    name: React.ReactNode,
    disable?: boolean,
    sx?: string,
}

const Button = ({ onClick, name, disable, sx }: Props) => {


    return (
        <button
            className={`h-12 w-48 ${disable ? "opacity-10" : " opacity-100"} bg-orange-500 border-orange-50 my-4 mx-auto rounded text-white ${sx} `}
            disabled={disable ? disable : false}
            onClick={() => onClick()}>
            {name}
        </button>
    )
}

export default Button