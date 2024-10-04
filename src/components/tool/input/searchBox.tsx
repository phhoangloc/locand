import React, { useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
type Props = {
    placehoder: string,
    func: (v: string) => void,

}

const SearchBox = ({ placehoder, func }: Props) => {

    const inputRef = useRef<any>("")

    const [isSeaching, setIsSearching] = useState<boolean>(false)
    return (
        <div className='flex w-max'>
            <input
                className={`bg-inherit w-0 h-10 p-0 transition-all duration-200 border-[0px] rounded text-sm m-auto border-slate-50 dark:border-slate-700 ${isSeaching ? "w-52 px-1 border-[1px]" : ""}`}
                ref={inputRef}
                type="text"
                placeholder={placehoder}
                onFocus={(e) => e.target.style.outline = 'none'}
                onChange={(e) => {
                    func(e.target.value)
                }}
            />
            <SearchIcon onClick={() => { setIsSearching(!isSeaching), inputRef.current.focus() }} className='!w-10 !h-10 p-2 my-auto cursor-pointer' />
        </div>
    )
}

export default SearchBox