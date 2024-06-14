

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import '../style/global.css'
import Provider from '@/redux/component/provider'
import DecideModal from '@/component/modal/decide.modal'
import NoticeModal from '@/component/modal/notice.modal'


const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: 'Locand | %s',
    default: 'Locand',
  },
  description: 'Loc and You',
  icons: {
    icon: '/img/icon.png',
  }
}

type Props = {
  children: React.ReactNode
}



export default function RootLayout({ children }: Props) {
  return (

    <html lang="en">
      <body className={font.className}>
        <Provider>
          <DecideModal />
          <NoticeModal />
          {children}
        </Provider>
      </body>
    </html>

  )
}
