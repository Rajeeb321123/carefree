import { BASE_URL } from '@/utils'
import axios from 'axios'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userAuthStore from 'store/authStore';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from 'types';


const Search = ({ videos }: { videos: Video[] }) => {
    const [isAccounts, setIsAccounts] = useState(false);
    const { allUsers }: { allUsers: IUser[] } = userAuthStore();
  
    const router = useRouter();
    const { searchTerm }: any = router.query;
  
    const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
    // toLowercase() insure no matter the upper and lower case and includes insure any accounts which included the terms
    const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
      <div className='w-full  '>
        <div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
          <p onClick={() => setIsAccounts(true)} className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}>
            Accounts
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`} onClick={() => setIsAccounts(false)}>
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className='md:mt-16'>
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, idx: number) => (
                <Link key={idx} href={`/profile/${user._id}`}>
                  <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
                    <div>
                      <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                    </div>
                    <div>
                      <div>
                        <p className='flex gap-1 items-center text-lg font-bold text-primary'>
                          {user.userName} <GoVerified className='text-blue-400' />
                        </p>
                        <p className='capitalize text-gray-400 text-sm'>
                          {user.userName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No Account Results for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start '>
            {videos.length ? (
              videos.map((post: Video, idx: number) => (
                <VideoCard post={post} key={idx} />
              ))
            ) : (
              <NoResults text={`No Video Results for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    );
  };
export const getServerSideProps = async ({
    // {params:{id}}we destructuring params and getting the id from there . it is similar to object with property id i.e paramas:{ id:string;}
       
    
    params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);


    // getServerSideProps always has return
    // populate this return props ahove in page
    return {
        props: { videos: res.data },
      };
};
export default Search