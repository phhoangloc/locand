import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {
    data: { title: string, func: (v: string) => void }[],
    title: string,
    func?: () => void,
    sx?: string,
}

const Select = ({ data, title, func, sx }: Props) => {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <div className={`relative ${sx}`}>
            <div className='flex h-12  bg-white dark:bg-slate-800' onClick={() => { setDrop(!drop), func && func() }}>
                <div className="flex justify-center flex-col text-center w-full cursor-pointer ">
                    {title}
                </div>
                <KeyboardArrowDownIcon className='!w-6 !h-6 my-3' />
            </div>
            <div className={`transition-all duration-100 overflow-hidden absolute z-[1]  bg-white dark:bg-slate-800 top-0 w-full shadow-md shadow-slate-200 dark:shadow-slate-900`} style={{ height: drop && data?.length ? data.length * 3 + "rem" : 0 }} >
                {data?.length ? data.map((d: { title: string, func: (v: string) => void }, index: number) =>
                    <div key={index} className='flex flex-col justify-center opacity-50 hover:opacity-100 p-1 box-border h-12 cursor-pointer text-center ' onClick={() => { d.func(d.title), setDrop(false) }}>
                        {d?.title}
                    </div>
                ) : null}
            </div >
        </div>
    )
}

export default Select