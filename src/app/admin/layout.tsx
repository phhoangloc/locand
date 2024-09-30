import Layout from '@/components/admin/layout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <div className='bg-slate-100 dark:bg-slate-900 min-h-screen dark:text-white'>
            <Layout>
                {children}
            </Layout>
        </div>
    )
}

export default layout