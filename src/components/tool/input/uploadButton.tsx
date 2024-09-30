'use client'
import React, { useRef } from 'react'
type Props = {
    sx?: string
    name: React.ReactNode | string;
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ sx, name, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={sx}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()}>{name}</div>
        </div>
    )
}

export default UploadButton