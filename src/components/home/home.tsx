import React from 'react'
import Cover from './cover'
import Template from './template'
import Header from './header'
type Props = {}

const Home = (props: Props) => {
    return (
        <div>
            <Header />
            <Cover />
            <Template />
        </div>
    )
}

export default Home