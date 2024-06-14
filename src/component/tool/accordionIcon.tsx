'use client'
import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import store from '@/redux/store';
type Props = {
    icon: React.ReactNode
    data?: any[],
    top?: string
    right?: string
    sx?: string
}

const AccordionIcon = ({ icon, data, top, right, sx }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    useEffect(() => {
        update()
    })

    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className={sx} style={{ position: "absolute", top: top, right: right }}>
            <div style={{ height: "40px", lineHeight: "40px" }}>
                <div style={{ width: `40px`, height: "40px", cursor: "pointer", padding: "5px" }} onClick={() => setOpen(!open)}>{icon}</div>
            </div>
            <div className={`mw100p bs-2px bglv1`}
                style={{ position: 'absolute', top: "40px", right: 0, width: "max-content", zIndex: 1, borderRadius: "5px", padding: "2px", display: open ? "block" : "none" }}>
                {
                    data ? data.map((item: any, index: number) =>
                        item.link ?
                            <Link href={item.link} key={index}>
                                <div className='hover-title' key={index}
                                    style={{ height: "40px", lineHeight: "40px", fontSize: "0.9rem", padding: "0px 15px", cursor: "pointer", opacity: 0.75, borderRadius: "5px", fontWeight: "bold" }}>
                                    {item.name}
                                </div>
                            </Link> :
                            <div className='hover-title' key={index} onClick={() => { item?.func(), setOpen(false) }}
                                style={{ height: "40px", lineHeight: "40px", fontSize: "0.9rem", padding: "0px 15px", cursor: "pointer", opacity: 0.75, borderRadius: "5px", fontWeight: "bold" }}>
                                {item.name}
                            </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default AccordionIcon