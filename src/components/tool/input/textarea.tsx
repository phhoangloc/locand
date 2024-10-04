import React, { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
type Props = {
    value: string,
    onChange: (e: string) => void
}

const Textarea = ({ value, onChange }: Props) => {
    const [_isView, set_isView] = useState<boolean>(false)
    const [_content, set_content] = useState<string>("")

    useEffect(() => {
        onChange(_content)
    }, [_content])
    return (
        <div className='w-full h-max relative'>
            <RemoveRedEyeIcon className='sticky right-0 top-0 !w-12 !h-12 p-3 cursor-pointer opacity-50 hover:opacity-100' onClick={() => set_isView(!_isView)} />
            {_isView ?
                <div className='dangerous_box w-full min-h-screen  shadow-md shadow-slate-200 dark:shadow-slate-900 ' dangerouslySetInnerHTML={{ __html: _content ? _content : value }} /> :
                <textarea className='w-full min-h-screen bg-inherit border-2 border-orange-500 p-4 ' defaultValue={_content ? _content : value}
                    onFocus={(e) => { e.target.style.outline = 'none'; }}
                    onChange={(e) => set_content(e.currentTarget.value)} />}
        </div>
    )
}

export default Textarea