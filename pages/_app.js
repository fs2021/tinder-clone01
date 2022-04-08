import '../styles/globals.css'
import { TinderProvider } from '../context/TinderContext'
import { MoralisProvider } from 'react-moralis'



function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl='https://sszpdkuossgu.usemoralis.com:2053/server'
      appId='yVCiQ8zisVmIGm0YyXYaFGpW268KhXvEYxYGBY1I'
    >
        <TinderProvider>
          <Component {...pageProps} />
        </TinderProvider>


    </MoralisProvider>
  
  )
}

export default MyApp
