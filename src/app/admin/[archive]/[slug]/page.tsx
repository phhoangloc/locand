import { EditDetailById, EditDetailbySlug } from '@/components/admin/detail'
import React from 'react'

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