import React from 'react'
import RefreshIcon from '@mui/icons-material/Refresh';
type Props = {}

export const LoadingComponent =
    (props: Props) => {
        return (
            <div className="w100p h100p ta-center ">
                <RefreshIcon className='iconLoading' />
            </div>
        )
    }

const Loading = (props: Props) => {
    return (
        <div className="w100p h100p dp-flex fd-col jc-center">
            <div className='loading'>
                <div className="item"></div>
                <div className="item" style={{ animationDelay: "0.5s" }}></div>
                <div className="item" style={{ animationDelay: "1s" }}></div>
                <div className="item" style={{ animationDelay: "1.5s" }}></div>
            </div>
        </div>
    )
}

export default Loading