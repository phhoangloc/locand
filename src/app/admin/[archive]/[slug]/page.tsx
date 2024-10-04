'use client'
import { EditDetailById, EditDetailbySlug } from '@/components/admin/detail'
import React from 'react'
import NotFound from '@/components/admin/notfound'
import Cover from '@/components/home/cover'
import Home from '@/components/home/home'
import Template from '@/components/home/template'
import Login from '@/components/admin/login'
import Signup from '@/components/admin/signup'
import Profile from '@/components/home/profile'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {

    if (params.archive === "user") {
        return (
            <EditDetailById path1='user' path2={params.slug} />
        )
    }
    return (
        <EditDetailbySlug path1={params.archive} path2={params.slug} />
    )
}

export default Page