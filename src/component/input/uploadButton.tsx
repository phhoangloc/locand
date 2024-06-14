'use client'
import React, { useRef } from 'react'
type Props = {
    name: React.ReactNode | string;
    sx?: React.CSSProperties;
    func?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton = ({ name, sx, func }: Props) => {
    const IconRef = useRef<HTMLInputElement | null>(null)
    return (
        <div style={sx}>
            <input ref={IconRef} type="file" style={{ display: "none" }} onChange={(e) => func && func(e)} multiple={true} />
            <div onClick={() => IconRef.current && IconRef.current.click()} style={{ width: "max-content", height: "max-content" }}>{name}</div>
        </div>
    )
}

export default UploadButton