'use server-only'

import Footer from 'components/shape/Footer'
import Header from 'components/shape/Header'
import 'styles/globals.css'
import { Providers } from '../providers/providers'
import { Bounce, ToastContainer } from 'react-toastify'
import { geistSans, geistMono, fontMono, fontSans, soehneKraftig } from 'config/fonts'
import css from 'styled-jsx/css'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html className={'dark'} lang={'en-US'} style={{ colorScheme: 'dark' }}>
      <body className={`${soehneKraftig.className} antialiased *:text-primary`}>
        <Providers>
          <main className='flex min-h-screen w-screen flex-col items-center justify-center'>
            <Header />
            {children}
            <Footer />
            <ToastContainer
              theme='dark'
              toastClassName={`${soehneKraftig.className}`}
              transition={Bounce}
            />
          </main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
