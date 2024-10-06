import React, { useRef } from 'react'
import { DetailCard } from '../tool/card/card';
type Props = {
    data: any,
}

const Detail = ({ data }: Props) => {

    const scroll = useRef<any>()

    return (
        <div className='flex flex-wrap lg:grid-cols-2 h-full justify-center'>
            <div className={`w-full lg:w-1/2 flex flex-col justify-center h-screen lg:sticky top-0 max-w-[475px] mx-[auto]`}>
                <DetailCard data={data} scroll={scroll} />
            </div>
            <div className="w-full lg:w-1/2 bg-white">
                <div ref={scroll}
                    className={`w-5/6 max-w-[800px] m-auto py-12 text-justify dangerous_box text-slate-900`}
                    dangerouslySetInnerHTML={
                        { __html: data?.content }
                    } />
            </div>
        </div>
    )
}

export default Detail