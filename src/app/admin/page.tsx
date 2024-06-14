'use client'
import Button from '@/component/input/button'
import { setAlert } from '@/redux/reducer/alertReducer'
import store from '@/redux/store'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [currentAlert, setCurrentAlert] = useState<any>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    useEffect(() => {
        update()
    })

    return (
        <div>
            admin
        </div>
    )
}

export default Page