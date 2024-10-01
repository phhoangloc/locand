import React from 'react'
import { useState } from 'react'
type Props = {
    icon1: React.ReactNode,
    icon2: React.ReactNode,
    value: boolean
}

const IconToogle = (props: Props) => {
    return (
        <div>
            {props.value ? props.icon1 : props.icon2}
        </div>
    )
}

export default IconToogle
type IconDropType = {
    icon?: React.ReactNode,
    data?: any[]
}
export const IconDrop = ({ icon, data }: IconDropType) => {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <div className='relative'>
            <div className='relative h-8 w-8 rounded-[50%] overflow-hidden m-2 ' onClick={() => { setDrop(!drop) }}>
                {icon}
            </div>
            <div className={`absolute transition-all duration-500 right-1 top-12 min-w-32  overflow-hidden shadow-lg shadow-slate-200 dark:shadow-slate-900 z-10 bg-white dark:bg-slate-800 rounded  ${drop ? "h-" + `${data?.length ? data.length * 12 : 0}` : "h-0"}`} >
                {data?.length ? data.map((d: any, index: number) =>
                    <div key={index} className='flex opacity-50 hover:opacity-100 p-1 box-border h-12 w-full cursor-pointer ' onClick={() => { d.func && d.func(), setDrop(false) }}>
                        {d?.icon}
                        <div className="flex justify-between w-full ">
                            <div className='flex flex-col justify-center w-full  px-1 text-center'>{d?.title}</div>
                        </div>
                    </div>
                ) : null}
            </div >
        </div>
    )
}