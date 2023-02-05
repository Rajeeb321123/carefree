import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  //  below isSSR will prevent error is future
  // SSR is server side rendering and set to true at start means we are in server side
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    // as we enter client side
    setIsSSR(false);
  }, []);
  // if there is empty [] in useEffect than it is only done at start only

  return (
    // wraping with GoogleOAuthProvider
    // we are just wraping client id in template string eg{`${}`}, otherwise typescript will show error warning saying clientId may be undefined rather than string
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[95%] m-auto overflow-hidden h-[100vh]'>
      <Navbar/>
      <div className='flex gap-6 md:gap-20'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar/>
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>

      </div>
      


    </GoogleOAuthProvider>


  )
}
