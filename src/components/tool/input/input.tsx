'use client'
import { relative } from 'path'
import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
type Props = {
    onChange: (e: any) => void,
    name: React.ReactNode,
    value: any,
    type?: string,
    onfocus?: () => void,
    disabled?: boolean,
    warn?: string,
    sx?: string,
    icon1?: React.ReactNode,
    icon2?: React.ReactNode
}

const Input = ({ onChange, name, value, type, onfocus, disabled, warn, sx, icon1, icon2 }: Props) => {

    const inputRef = useRef<any>("")
    const [focus, setFocus] = useState<boolean>(false)


    return (
        <div className={`mb-4 relative ${sx}`}>
            <div className={`absolute transition-all px-2 ${focus || value ? warn ? "top-0 text-red-500 opacity-75 text-sm" : "top-0 text-amber-600 opacity-75 text-sm" : "top-4"}`} onClick={() => { inputRef.current.focus() }}>{name}</div>
            <input
                className={`w-full border-[1px] text-base h-12 px-2 pt-4 bg-inherit text-inherit rounded-md border-slate-500 ${focus || value ? "!border-amber-600 !border-2" : ""} ${disabled ? "opacity-50" : "opacity-100"}`}
                ref={inputRef}
                disabled={disabled ? disabled : false}
                defaultValue={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={(e) => { setFocus(true); onfocus && onfocus(); e.target.style.outline = 'none'; }}
                onBlur={() => setFocus(false)}
                type={type}
            >
            </input>
            <div className='w-max absolute flex right-1 top-0 h-12'>
                {icon1}{warn ? <CloseIcon className='w-7 h-7 m-auto cursor-pointer' onClick={() => { inputRef.current.value = "", onChange("") }} /> : icon2}
            </div>
            {warn ? <div className='text-xs text-center text-red-600 p-1'>{warn}</div> : null}
        </div >
    )
}

export default Input