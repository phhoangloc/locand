import Login from '@/component/admin/auth/login'
import React from 'react'


const page = () => {
    return (
        <div className='mh100h dp-flex fd-col jc-center'>
            <Login archive='admin' />
        </div>
    )
}

export default page