import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video } from 'types';
import { BASE_URL } from '../../utils';


// for specifying the data type comining from api from backend
interface Iprops{
    data:{
        user:IUser,
        userVideos:Video[],
        userLikedVideos:Video[]

    }
}

const Profile = ({data}:Iprops) => {

    // destructuring from the data in iprops
    const {user,userVideos,userLikedVideos}=data;

    // this state and variable video_css and like_css is just for making underline below video and likes option and nothing more
    const [showUserVideos, setShowUserVideos] = useState(true);
    const videos_css =showUserVideos?'border-b-2 border-black':'text-gray-400'
    const liked_css=!showUserVideos?'border-b-2 border-black':'text-gray-400'


    // now for showing the user videos and liked videos
    const [videosList, setVideosList] = useState<Video[]>([]);

    useEffect(() => {
      if(showUserVideos){
        setVideosList(userVideos);
        console.log(videosList)

      }
      else{
        setVideosList(userLikedVideos);
      }
    
     
    }, [showUserVideos,userLikedVideos,userVideos])
    
    console.log(videosList)




  return (
    <div className='w-full'>
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className='w-20 h-20 md:w-28 md:h-28'>
                <Image
                  width={120}
                  height={120}
                  className='rounded-full'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>
              <div className='flex flex-col justify-center'>
                <p className=' md:text-2xl tracking-wider  justify-center flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {/* .replace(before,after) and here we replace all the spaces with no spaces */}
                  {user.userName.replace(' ', '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {user.userName}
                </p>
              </div>
        </div>

        <div>
            <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
                {/* important note if onclick is used as={direct_fuction} and  isnot used as callback fuction like below ,sometimes it will give render error */}
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos_css}`} onClick={()=>{setShowUserVideos(true)}}>Videos</p>
                <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked_css}`} onClick={()=>{setShowUserVideos(false)}}>Liked</p>

            </div>

            {/* now mapping and showing the video */}
            <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
            />
          )}
            </div>
        </div>
    </div>
  )
}


export const getServerSideProps = async ({
    // {params:{id}}we destructuring params and getting the id from there . it is similar to object with property id i.e paramas:{ id:string;}
       
    
    params: {id }}:{params:{id:string}
})=>{
    const res= await axios .get(`${BASE_URL}/api/profile/${id}`)


    // getServerSideProps always has return
    // populate this return props ahove in page
    return {
        props: { data: res.data },
      };
}

export default Profile