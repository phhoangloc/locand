'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import SearchBox from '../tool/input/searchBox'
import Link from 'next/link'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import moment from 'moment'
import Image from 'next/image'
import Pagination from '../tool/page/pagination'
import UploadButton from '../tool/input/uploadButton'
import AddIcon from '@mui/icons-material/Add';
import { setAlert } from '@/redux/reducer/alertReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ApiDeleteItem, ApiItemUser, ApiUploadFile } from '@/api/user'
import Input from '../tool/input/input'
import { setNotice } from '@/redux/reducer/noticeReducer'
import NotFound from './notfound'
type Props = {
    genre: string
}
export const Archive = ({ genre }: Props) => {

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()
    const [isPageNoFound, setIsPageNotFound] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const [i, setI] = useState<number>(0)

    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(24)
    const [isEnd, setIsEnd] = useState<boolean>(true)

    const [file, setFile] = useState<File | undefined>()
    const [loadingcurrent, setLoadingCurrent] = useState<number>(0)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<number>(0)

    const [id, setId] = useState<string>("")
    const [isDelete, setIsDelete] = useState<boolean>(false)

    const getItems = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined, sort: string) => {
        setIsLoading(true)
        const result = await ApiItemUser({ position: p, genre: a, search: s, skip: skip, limit: li, sort: sort })
        if (result.error) {
            setIsPageNotFound(true)
            setIsLoading(false)
        } else {
            setIsPageNotFound(false)
            if (result.success) {
                setIsLoading(false)
                setItems(result.data)
            } else {
                setIsLoading(false)
                setItems([])

            }
        }
    }
    const getItemPlus = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined, sort: string) => {
        const result = await ApiItemUser({ position: p, genre: a, search: s, skip: skip, limit: li, sort: sort })
        if (result.data?.length) {
            setIsEnd(false)
        } else {
            setIsEnd(true)
        }
    }

    const deleteItem = (id: string) => {
        store.dispatch(setAlert({ open: true, value: false, msg: "are you sure to want to delete this post" }))
        setId(id)
        setIsDelete(true)
    }


    useEffect(() => {
        if (currentAlert.value && isDelete) {
            const deleteItemAgain = async (p: string, a: string, id: string) => {
                const result = await ApiDeleteItem({ position: p, genre: a, id: id })
                if (result) {
                    const interval = setInterval(() => {
                        setLoadingCurrent(v => v + 0.025)
                    }, 50)
                    setTimeout(() => {
                        clearInterval(interval)
                        setLoadingButton(false)
                        setIsDelete(false)
                        setRefresh(n => n + 1)
                    }, 500)
                }
            }
            currentUser.position && id && deleteItemAgain(currentUser.position, genre, id)
        }
    }, [currentAlert, currentUser, isDelete, id])
    useEffect(() => {
        currentUser.position && getItems(currentUser.position, genre, search, page * limit, limit, "")
        currentUser.position && getItemPlus(currentUser.position, genre, search, (page + 1) * limit, limit, "")
    }, [currentUser.position, search, page, refresh])

    useEffect(() => {
        loadingButton && setLoadingCurrent(0)
        const interval = loadingButton ? setInterval(() => {
            setLoadingCurrent(v => v + 0.025)
        }, 50) : undefined;

        setTimeout(() => {
            clearInterval(interval)
        }, 1500)
    }, [loadingButton])

    if (isPageNoFound) {
        return <NotFound />
    }
    return (
        isLoading ? <p>loading...</p> :
            <div className='bg-white dark:bg-slate-800 rounded m-1 shadow-md'>
                <div className='flex h-12 justify-between relative px-2'>
                    <div className="flex">
                        <h3 className='text-xl font-bold h-full flex flex-col justify-center'>{genre} </h3>
                        <AddIcon className='!w-auto !h-full p-2 cursor-pointer' onClick={() => toPage.push(genre + "/news")} />
                    </div>
                    <SearchBox placehoder='検索' func={(v) => setSearch(v)} />
                </div>
                {items?.length ?
                    items.map((n: any, index: number) =>
                        <div key={index} className={`flex h-12 transition duration-200 ruonded border-b-[1px] border-slate-100 dark:border-slate-800 even:bg-slate-100 dark:even:bg-slate-800 hover:!bg-slate-200 dark:hover:!bg-slate-500`} >
                            <LabelOutlinedIcon className='!w-auto !h-full p-3 hidden md:block' />
                            <div className="w-full h-full  flex flex-col justify-center px-1 cursor-pointer text-sm md:text-base">
                                <h4 title={n.name} className={`truncate`}
                                    onClick={() => toPage.push(n.slug ? "/admin/" + n.archive + "/" + n.slug : "/admin/" + n.archive + "/" + n.id)}
                                >
                                    {n.username || n.name}
                                </h4>
                                <p className="text-xs opacity-50"> {n.position || n.updateDate && moment(n.updateDate).format("MM/DD") || moment(n.createDate).format("MM/DD")}</p>
                            </div>
                            <div className="hidden w-max md:flex">
                                {genre === "singlepage" ?
                                    <Link style={{ textDecoration: "none", color: "inherit" }} href={n.slug ? "/" + n.slug : "/" + n.archive + "/" + n._id} target='_blank'>
                                        <RemoveRedEyeOutlinedIcon className=' !w-auto !h-full p-2 cursor-pointer hover:text-orange-500 ' />
                                    </Link>
                                    : <Link style={{ textDecoration: "none", color: "inherit" }} href={n.slug ? "/" + n.archive + "/" + n.slug : "/" + n.archive + "/" + n._id} target='_blank'>
                                        <RemoveRedEyeOutlinedIcon className=' !w-auto !h-full p-2 cursor-pointer hover:text-orange-500 ' />
                                    </Link>}
                                <DeleteOutlineOutlinedIcon className=' !w-auto !h-full p-2 cursor-pointer hover:text-orange-500' onClick={() => deleteItem(n.id)} />
                            </div>
                        </div>

                    ) :
                    <div className='flex h-12 justify-between relative p-2'>there are no {genre}</div>}
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={isEnd} />
            </div>

    )
}

type PropsArchivePic = {
    edit?: boolean,
    defaultlimit?: number,
    type?: string
}

export const ArchivePic = ({ edit, defaultlimit, type }: PropsArchivePic) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()
    const genre = "pic"
    const [items, setItems] = useState<any[]>([])
    const [isEnd, setIsEnd] = useState<boolean>(true)
    const [refresh, setRefresh] = useState<number>(0)

    const [search, setSearch] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingButton, setLoadingButton] = useState<boolean>(false)

    const [id, setId] = useState<string>("")
    const [file, setFile] = useState<File | undefined>()
    const [files, setFiles] = useState<FileList>()
    const [isUpload, setIsUpload] = useState<boolean>(false)
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(defaultlimit ? defaultlimit : 24)

    const [isCopyLink, setIsCopyLink] = useState<boolean>(false)
    const [i, setI] = useState<number>(-1)

    const [isDelete, setIsDelete] = useState<boolean>(false)

    const getItems = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined) => {
        setLoading(true)
        const result = await ApiItemUser({ position: p, genre: a, search: s, skip: skip, limit: li })
        if (result.success) {
            setLoading(false)
            setItems(result.data)
        } else {
            setLoading(false)
            setItems([])
        }
    }
    const getItemPlus = async (p: string, a: string, s: string, skip: number | undefined, li: number | undefined) => {
        const result = await ApiItemUser({ position: p, genre: a, search: s, skip: skip, limit: li })
        if (result.success && result.data.length) {
            setIsEnd(false)
        } else {
            setIsEnd(true)
        }
    }

    useEffect(() => {
        currentUser.position && getItems(currentUser.position, genre, search, page * limit, limit)
        currentUser.position && getItemPlus(currentUser.position, genre, search, (page + 1) * limit, limit)
    }, [currentUser.position, refresh, page, search])

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            store.dispatch(setAlert({ value: false, msg: "do you want to update this picture", open: true }))
            setIsUpload(true)
            if (files.length > 1) {
                setFiles(files)
            } else {
                setFile(file)
            }
        }
    }

    const deleteImage = async (id: string) => {
        store.dispatch(setAlert({ value: false, msg: "do you want to delete this picture", open: true }))
        setIsDelete(true)
        setId(id)
    }
    useEffect(() => {
        if (currentAlert.value && isDelete) {
            const deleteImage = async (p: string, a: string, id: string) => {
                setLoadingButton(true)
                const result = await ApiDeleteItem({ position: p, genre: a, id: id })
                if (result) {
                    setI(-1)
                    setId("")
                    setLoadingButton(false)
                    setIsDelete(false)
                    setRefresh(r => r + 1)
                }
            }
            currentUser.position && id && deleteImage(currentUser.position, genre, id)
        }
    }, [currentAlert, currentUser, isDelete, id])

    useEffect(() => {
        if (currentAlert.value && isUpload) {
            const UpdateImage = async (p: string, a: string, f: File) => {
                setLoadingButton(true)
                const result = await ApiUploadFile({ position: p, genre: a, file: f })
                if (result) {
                    setLoadingButton(false)
                    setIsUpload(false)
                    setRefresh(r => r + 1)
                }
            }
            currentUser.position && file && UpdateImage(currentUser.position, "pic", file)
        }
    }, [currentAlert, currentUser, isUpload, file])
    useEffect(() => {
        if (currentAlert.value && isUpload && files?.length) {
            const UpdateImage = async (p: string, a: string, f: File) => {
                setLoadingButton(true)
                const result = await ApiUploadFile({ position: p, genre: a, file: f })
                if (result) {
                    setLoadingButton(false)
                    setIsUpload(false)
                    setRefresh(r => r + 1)
                }
            }
            for (let index = 0; index < files.length; index++) {
                currentUser.position && UpdateImage(currentUser.position, "pic", files[index])
            }
        }
    }, [currentAlert, currentUser, isUpload, files])
    useEffect(() => {
        isCopyLink && navigator.clipboard.writeText(process.env.ftp_url + "template2/" + items[i].name);
        isCopyLink && store.dispatch(setNotice({ open: true, success: false, msg: "copied" }))
        setTimeout(() => {
            store.dispatch(setNotice({ open: false, success: false, msg: "" }))
        }, 3000)
    }, [isCopyLink])

    return (
        <div className='w-full'>
            {i !== -1 &&
                <div className='fixed w-screen h-screen top-0 left-0 backdrop-brightness-50 backdrop-blur-sm z-[1] flex flex-col justify-center'>
                    <div className="w-3/4 max-w-[992px] m-auto p-4 rounded grid grid-cols-1 md:grid-cols-2 gap-1  bg-slate-50 dark:bg-slate-800">
                        <div className="relative w-full aspect-video rounded overflow-hidden p-1">
                            <Image quality={100} src={process.env.ftp_url + items[i].name} fill alt="" sizes='100%' priority style={{ objectFit: "cover", }} />
                        </div>
                        <div className="relative w-full aspect-video p-1">
                            <Input name="name" value={items[i].name} onChange={() => { }} disabled={true} />
                            <Input name="url" value={process.env.ftp_url + "template2/" + items[i].name} onChange={() => { }} disabled={true}
                                icon1={<ContentCopyIcon className='w-9 h-9 p-1 m-auto bg-slate-50 dark:bg-slate-800 hover:text-orange-500 cursor-pointer' onClick={() => setIsCopyLink(true)} />} />
                            <div className='flex justify-between'>
                                <DeleteOutlineOutlinedIcon className='hover:text-orange-500 cursor-pointer' onClick={() => deleteImage(items[i].id)} />
                                <p className='hover:text-orange-500 cursor-pointer' onClick={() => setI(-1)} >close</p>
                            </div>
                        </div>
                    </div>
                </div>}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full gap-1 h-screen-36 overflow-auto h-5/6 ">
                <div className=' relative w100p aspect-square overflow-hidden rounded border-[1px] flex flex-col justify-center text-center cursor-pointer shadow-lg  bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-800'>
                    {loadingButton ? "LOADING..." : <UploadButton name="ADD IMAGE" func={(e) => { getFile(e), setFile(undefined), setFiles(undefined) }} />}
                </div>
                {
                    items.map((item, index) =>
                        <div key={index} className=' relative w100p aspect-square overflow-hidden rounded border-[1px] flex flex-col justify-center text-center cursor-pointer shadow-lg border-slate-100 dark:border-slate-800' onClick={() => setI(index)}>
                            <Image className='opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300' quality={100} src={process.env.ftp_url + item.name} fill alt="" sizes='100%' priority style={{ objectFit: "cover", }} />
                        </div>
                    )
                }
            </div>
            {edit &&
                <div className='pd-5px br-5px mg-10px-0px h-1/6'>
                    <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={isEnd} />
                </div>}
        </div>
    )
}
