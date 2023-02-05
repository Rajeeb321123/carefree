import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
// todo google login import
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { normalize } from 'path'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

const Sidebar = () => {
  // state to showsidebar
  const [showSidebar, setShowSidebar] = useState(true);
  // userProfile to check user is logged in or not
  const userProfile = false;
  // we will be creating two link
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded '
  return (
    <div  >
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        // dont use like onclick={()=> seShowSidebar(!showSidbar) as it is not good practice to use previous state to change to new state , can lead to error} . Instead use callback fuction which consist previous version of state  like below
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
          <Link href='/'>
            <div className={normalLink}>
              <p className='text-2xl'>
                <AiFillHome />
              </p>
              <span className='text-xl hidden xl:block'>
                For you
              </span>

            </div>
          </Link>


        </div>
         
         <Discover/>
         <SuggestedAccounts/>
         
         <Footer/>
         

        </div>
        



      )}


    </div>

  )
}

export default Sidebar