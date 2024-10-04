'use client'
import React, { useState, useEffect } from 'react'
import UploadButton from '../tool/input/uploadButton'
import store from '@/redux/store'
import Image from 'next/image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PendingIcon from '@mui/icons-material/Pending';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CollectionsIcon from '@mui/icons-material/Collections';
import { ApiItemUser, ApiUploadFile } from '@/api/user'
import Button from '../tool/input/button'

type Props = {
    modalOpen?: boolean
    onCanel?: () => void
    onSubmit?: (id: string) => void
    onSendArray?: (arr: string[]) => void
}

const ImageModal = ({ modalOpen, onCanel, onSubmit, onSendArray }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [refresh, setRefresh] = useState<number>(0)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    const getFile = async (e: any) => {
        var files = e.target.files;
        for (let index = 0; index < files.length; index++) {
            const file: File = files[index]
            var reader: any = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async function () {
                setLoading(true)
                const result = currentUser.position && await ApiUploadFile({ position: currentUser.position, archive: "pic", file: file })
                if (result) {
                    setLoading(false)
                    setRefresh(n => n + 1)
                }
            }

        }

    }

    const [data, setData] = useState<any[]>([])
    const getMedia = async () => {
        const result = await ApiItemUser({ position: currentUser.position, archive: "pic" })
        if (result.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser.position && getMedia()
    }, [currentUser.position, refresh])
    const [arrId, setArrId] = useState<string[]>([])

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        if (e.ctrlKey) {
            setArrId((arr) => arr.includes(id) ? arr.filter(i => i !== id) : [...arr, id])
        } else {
            onSubmit && onSubmit(id);
            setArrId([])
        }
    }

    return (
        <div className={`fixed w-screen h-screen top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-[1] flex flex-col justify-center ${modalOpen ? "block" : "hidden"}`}>

            <CloseIcon className="absolute top-1 right-1 hover:text-orange-500 cursor-pointer" onClick={() => { onCanel && onCanel(), setArrId([]) }} />

            <div className="w-5/6 max-w-[992px] h-[600px] mx-auto p-4 rounded grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1  bg-slate-50 dark:bg-slate-800">
                <div className=' relative w100p aspect-square overflow-hidden rounded border-[1px] flex flex-col justify-center text-center cursor-pointer shadow-lg  bg-white dark:bg-slate-700 border-slate-100 dark:border-slate-800'>
                    {loading ? "LOADING..." : <UploadButton name="ADD IMAGE" func={(e) => { getFile(e) }} />}
                </div>
                {
                    data.map((d, index) =>
                        <div key={index} className={`relative w100p aspect-square overflow-hidden rounded border-[1px] flex flex-col justify-center text-center cursor-pointer shadow-lg border-slate-100 dark:border-slate-800 ${arrId.includes(d.id) ? "shadow-slate-500" : ""}`} onClick={(e) => { onClick(e, d.id) }} >
                            <Image className='hover:scale-110 transition-all duration-300' quality={100} src={process.env.ftp_url + d.name} fill alt="" sizes='100%' priority style={{ objectFit: "cover", }} />
                        </div>
                    )
                }
            </div>
            {arrId.length ? <div className="w-5/6 max-w-[992px] mx-auto">
                <Button name="ok" onClick={() => { onSendArray && onSendArray(arrId), setArrId([]) }} />
            </div> : null}
        </div>
    )
}

export default ImageModal