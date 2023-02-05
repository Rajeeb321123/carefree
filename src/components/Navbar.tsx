import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Google auth  login and logout import and also jwt-decode is need to install in npm
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/carefree-logo.png'
import { createOrGetUser } from '@/utils';
import Logo2 from '../utils/beerlogo.gif'

import userAuthStore from 'store/authStore';


const css = { width: '100%', height: 'auto' }

const Navbar = () => {

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  // getting userProfile and adduser from userAuthStore
  const { userProfile, addUser, removeUser } = userAuthStore();

  // below useEffect is imp so you dont get hydration error inh= nextjs
  useEffect(() => {
    setUser(userProfile);
  }, [userProfile])


  // handling search
  // below e:{preventDefault:()=>void} is just for typescript otherwise typescript will show error 
  // :{preventDefault:()=>void} means e contains preventDefault which return void
  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] '>
          {/* <Image
            className='cursor-pointer'
            src={Logo}
            alt='logo'
            sizes="100vw" style={css}
          /> */}
          <Image
            className='cursor-pointer'
            src={Logo2}
            alt='logo'
            sizes="100vw" style={css}
          />
        </div>
      </Link>



      <div className='relative hidden md:block'>
        <form onSubmit={handleSearch} className="absolute md:static top-10 left-20 bg-white">
          <input
            type="text" value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and video"
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0' />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {user ? (
          <div className='flex gap-5 md:gap-10 items-center '>
            <Link href='/Upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex  gap-2'>
                <IoMdAdd className='text-xl' />{` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>

            {user.image && (
              <Link href="/">
                {/* we cant directly put image inside Link , so make a fragment */}
                <>
                  {/* in nextjs we have configure image host name in next.config.js otherwise we get Error: Invalid src prop */}
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full"
                    src={user.image}
                    alt="profile photo"

                  // layout='responsive'
                  />
                </>
              </Link>


            )}

            <button
              type='button'
              className='px-2'
              onClick={() => {
                // logging out is very simple 
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>


          </div>

        ) : (<GoogleLogin
          onSuccess={response => {
            createOrGetUser(response, addUser);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />)}

      </div>
    </div>
  )
}

export default Navbar