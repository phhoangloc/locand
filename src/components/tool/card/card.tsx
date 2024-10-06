import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import store from '@/redux/store';
// import { ChangePageType, setChangePage } from '@/redux/reducer/changPageReduce';
import moment from 'moment';
type PropsDetail = {
    data: any,
    scroll?: any
    sendChapter?: any,

}

export const ArchiveCard = ({ item, onClick }: { item: any, onClick?: (link: string) => void }) => {
    return (
        <div className='xs12 md6 lg4 pd-5px'>
            <div className=' w100p of-hidden br-5px'>
                <div className="grid_box bg pd-5p ">
                    <div className=' xs8 ps-re as-1 of-hidden br-5px ta-center '>
                        {item.cover?.name ?
                            <Image className='trss-1-4' src={process.env.ftp_url + "locand/" + item.cover?.name}
                                width={500}
                                height={500}
                                style={{
                                    height: "100%",
                                    width: "auto",
                                    zIndex: 0
                                }}
                                priority={true}
                                alt='cover' /> :
                            null
                        }
                    </div>
                    <div className='xs4 dp-flex fd-col jc-end'>
                        <p className='w-mc h-mc mg-0px-auto ta-center pd-5px bor-bottom-1px'>{moment(item.createDate).format('YYYY.MM.DD')}</p>
                    </div>
                </div>
                <div className=' pd-10px'>
                    <p className='mg-bottom-10px'>{item.genre}</p>
                    <h4 title={item.name} className=' mg-auto ta-left lh20px cl-main mg-bottom-5px'>{item.name}</h4>
                    <h4 title={item.name} className=' mg-auto ta-left lh20px cl-main mg-bottom-5px opa-50p'>{item.host.username}</h4>
                    <p className='bg w-mc h-mc mg-0px-auto ta-center pd-10px bor-1px br-5px cs-p title-hover trss-1-4' onClick={() => onClick && onClick("/" + item.genre + "/" + item.slug)}>read more</p>
                </div>
            </div>
        </div>
    )
}

export const DetailCard = ({ scroll, data, sendChapter }: PropsDetail) => {

    const toPage = useRouter()

    const [chapter, setChapter] = useState<number>(-1)

    useEffect(() => {
        sendChapter && sendChapter(chapter)
    }, [chapter])



    return (
        <div className={`w-full h-max shadow-lg m-auto bg-white flex rounded `}>
            <div className={`flex flex-col justify-between w-16 bg-slate-50 `}>
                <HomeIcon className='!w-12 !h-12 cursor-pointer p-2 text-orange-500 mx-auto' onClick={() => toPage.push("/")} />
                <h3 className='flex flex-col justify-center text-2xl font-bold text-orange-500' style={{ writingMode: "vertical-rl" }}>{data?.archive}</h3>
                {data?.genre !== "page" && <ArrowBackIcon className='!w-12 !h-12 cursor-pointer p-2 text-orange-500 mx-auto' onClick={() => toPage.back()} />}
            </div>
            <div className="w-full-16">
                <div className={`w-full aspect-[1.5] text-center relative`}>
                    {data?.cover?.name ?
                        <Image src={process.env.ftp_url + data?.cover?.name} fill alt='cover' style={{ objectFit: "cover" }} priority={true} />
                        : <div className='w-full aspect-square text-center flex flex-col justify-center'>NO IMAGE</div>
                    }
                </div>
                <div className={`h-12 flex justify-center flex-col p-1 `}>
                    <div className='truncate  text-lg font-bold opacity-75'>{data?.name}</div>
                </div>

            </div>
        </div>
    )
}

