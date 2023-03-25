import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import {Ubuntu} from 'next/font/google'

const ubuntu = Ubuntu({
  style: 'normal',
  weight: '300',
  preload: false
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps}  className={ubuntu.className} />
}
