import React, { useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
type Props = {
    placehoder: string,
    func: (v: string) => void,

}

const SearchBox = ({ placehoder, func }: Props) => {

    const inputRef = useRef<any>("")

    const inputStyle: React.CSSProperties = { width: 0, margin: 0, padding: 0, border: 0, transition: "all 0.25s", borderRadius: "5px" }
    const inputFocusStyle: React.CSSProperties = { width: "200px", border: "1px solid #aaa", padding: "0 5px" }

    const [isSeaching, setIsSearching] = useState<boolean>(false)
    return (
        <div className='flex w-max'>
            <input
                className={`bg-inherit w-0 m-0 p-0 transition-all duration-200 border-[0px] rounded text-sm  ${isSeaching ? "w-52 px-1 !bg-slate-50 dark:!bg-slate-900" : ""}`}
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