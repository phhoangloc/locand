import Layout, { LayoutV2 } from '@/components/admin/layout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='bg-slate-100 dark:bg-slate-900 min-h-screen dark:text-white'>
            <LayoutV2>
                {children}
            </LayoutV2>
        </div>
    )
}

export default layout