import React, { useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
    icon?: React.ReactNode,
    title: React.ReactNode,
    func?: () => void,
    data?: any,
    sx?: string,
    sxtitle?: string,
    itemfuc?: (i: number) => void
}

export const TitleDrop = ({ icon, title, func, data, sx, sxtitle, itemfuc }: Props) => {
    const [drop, setDrop] = useState<boolean>(false)
    return (
        <>
            <div className='flex h-12' onClick={() => { setDrop(!drop), func && func() }}>
                {icon}
                <div className="flex justify-between w-full  ">
                    <div className='flex flex-col justify-center'>{title}</div>
                    {data?.length ? <ArrowDropDownIcon className='w-auto h-full p-3' /> : null}
                </div>
            </div>
            <div className={`transition-all duration-500 overflow-hidden`} style={{ height: drop && data?.length ? data.length * 3 + "rem" : 0 }} >
                {data?.length ? data.map((d: any, index: number) =>
                    <div key={index} className='flex opacity-50 hover:opacity-100 p-1 box-border h-12 ' onClick={() => d.func()}>
                        {d?.icon}
                        <div className="flex justify-between w-max ">
                            <div className='flex flex-col justify-center w-max px-1'>{d?.title}</div>
                        </div>
                    </div>
                ) : null}
            </div >
        </>
    )
}

// const Title = ({ data, sx }: Props) => {
//     const [drop, setDrop] = useState<boolean>(false)
//     return (
//         <>
//             <div onClick={() => { data.func && data.func(), setDrop(!drop) }} className={`dp-flex ${sx}`}>
//                 {data.icon}
//                 <h4 className='text-nowrap mg-0px-5px'>{data.name}</h4>
//             </div>
//             {
//                 data.children?.length ?
//                     <div className={`of-auto scroll trss-1-10 mg-0px-5px`} style={{ height: drop ? data.children.length * 40 + "px" : "0px" }}>
//                         {data.children.map((item: any, index: number) =>
//                             <div key={index} onClick={() => { item.func && item.func() }} className={`bg1 dp-flex h40px lh40px cs-p title-hover mg-auto `}>
//                                 <div>{item.icon}</div>
//                                 <p className='mg-0px-5px'>{item.name}</p>
//                             </div>)
//                         }
//                     </div> : null
//             }
//         </>
//     )
// }

// export default Title