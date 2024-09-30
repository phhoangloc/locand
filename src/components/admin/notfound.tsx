import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
    return (
        <div className='w-full h-full'>
            <div className=" h-full p-1 rounded flex flex-col justify-center text-center text-xl font-bold">
                <h1>Opp!</h1>
                <h1>This Page Not Found</h1>
                <h1>404</h1>
            </div>
        </div>
    )
}

export default NotFound