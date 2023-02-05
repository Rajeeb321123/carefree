import React, { useEffect,useState } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { IUser } from 'types';

import userAuthStore from 'store/authStore';




const SuggestedAccounts = () => {

  const{fetchAllUsers,allUsers}=userAuthStore();
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchAllUsers();
    setUsers(allUsers);
    
    
    
      
  
    
  }, [fetchAllUsers,allUsers]);

 
  return (

    
    
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>


      {/* slice is used just to get 6 users only */}
      {users?.slice(0, 2).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>
              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {/* .replace(before,after) and here we replace all the spaces with no spaces */}
                  {user.userName.replace(' ', '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
          </div>
        </Link>
      ))}



    </div>
  )
}

export default SuggestedAccounts