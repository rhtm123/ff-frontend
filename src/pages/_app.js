import '@/styles/globals.css'
import Layout from '@/components/Layout'

import { AuthProvider } from '@/context/AuthContext';

import { ThemeProvider } from 'next-themes'


export default function App({ Component, pageProps }) {
  return( 
  <ThemeProvider >
  <AuthProvider>
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </AuthProvider>
  </ThemeProvider>
  )
}
