import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className="center">
            <h2>This Page Not Found</h2>
            <Link href="/" ><h3>Home</h3></Link>
        </div >
    )
}

export default NotFound