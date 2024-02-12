import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>{"Admin - Lucknow Golf Club "}</title>
    </Head>
    <Component {...pageProps} />
  </>
  )
}
