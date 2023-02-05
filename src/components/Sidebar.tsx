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
import { BiSearch } from 'react-icons/bi';


const Sidebar = () => {

  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [sideBarSearchShow, setSideBarSearchShow] = useState(false)

  const sideBarSearchCss = sideBarSearchShow? 'absolute  top-20 item-center' : 'hidden absolute top-1 item-center';


  // state to showsidebar
  const [showSidebar, setShowSidebar] = useState(true);
  // userProfile to check user is logged in or not
  const userProfile = false;
  // we will be creating two link
  const normalLink = 'flex  text-[#355C7D] items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded ';

  // handling search , only for small device
  // below e:{preventDefault:()=>void} is just for typescript otherwise typescript will show error 
  // :{preventDefault:()=>void} means e contains preventDefault which return void
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSideBarSearchShow(false);

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  
  const handleSearchShow=()=>{
    if(sideBarSearchShow===true){
      setSideBarSearchShow(false);
    }
    else{
      setSideBarSearchShow(true);
    }
  }
  
  
  
  
  return (
    <div className='' >
      <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
        // dont use like onclick={()=> seShowSidebar(!showSidbar) as it is not good practice to use previous state to change to new state , can lead to error} . Instead use callback fuction which consist previous version of state  like below
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>


      <div className={sideBarSearchCss}>
      <form onSubmit={handleSearch} className="absolute md:static  left-20 bg-white ">
          <input
            type="text" value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts & video"
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px]  ' />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
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
                Home
              </span>

            </div>
          </Link>

       

        </div>

        <div className='md:hidden'>
        <button
            onClick={handleSearchShow}
            className='hover:text-3xl hover:bg-primary md:right-5 right-6 top-4  pl-4 text-2xl text-[#7fffd4]'
          >
            <BiSearch />
          </button>
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