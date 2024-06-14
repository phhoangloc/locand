import React from 'react'

type Props = {
    icon1: React.ReactNode,
    icon2: React.ReactNode,
    value: boolean,
    sx?: string,
    style?: React.CSSProperties
}

const IconToggle = ({ icon1, icon2, value, sx, style }: Props) => {
    return (
        <div className={sx ? sx : ""} style={style ? style : {}}>
            {value ? icon1 : icon2}
        </div>
    )
}

export default IconToggle