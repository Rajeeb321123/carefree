import React, { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import { Video } from 'types'
import Image from 'next/image';

import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs"
import { GoVerified } from 'react-icons/go'
import postedBy from 'sanity-backend/schemas/postedBy';

const css = { width: '100%', height: 'auto' }
interface Iprops {
  post: Video;
}

// below is proper way rather than {post}:Iprops
const VideoCard: NextPage<Iprops> = ({ post }) => {

  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)


  // below is the power of typescrit in <HTMLVideoElement> specifying the type is video
  const videoRef =useRef<HTMLVideoElement>(null)

  const onVideoPress=()=>{
    if(playing){
      // current will provide current property using useRef
      videoRef?.current?.pause();
      setPlaying(false)
    }
    else{
      videoRef?.current?.play();
      setPlaying(true)
    }
  }

  // for volume mute and unmute
  useEffect(() => {
    if(videoRef?.current){
      // isVideomuted is boolean value
      videoRef.current.muted=isVideoMuted
    }
  
    
  }, [isVideoMuted])
  


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>


        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='"md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
              {/* we cant directly put image inside Link , so make a fragment */}
              <>
                {/* in nextjs we have configure image host name in next.config.js otherwise we get Error: Invalid src prop */}
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  sizes="100vw" style={css}
                // layout='responsive'
                />
              </>
            </Link>


          </div>
          <div
          >
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2  font-bold text-green-400 md:text-md'>{post.postedBy.userName}
                  {` `}
                  <GoVerified className='text-primary text-md relative top-2 left-0'
                  />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block '>{post.postedBy.userName}</p>


              </div>

            </Link>
          </div>
        </div>


      </div>
      <div>
        {/* here we create actual  video */}
        <div className='lg:ml-20 flex gap-4 relative'>
          <div
            // when mouse enter and leave the area
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
            className='roundedj-3xl'>
            <Link href={`/detail/${post._id}`}>
              <video

                loop
                ref={videoRef}
                className='lg:w-[600px] h-[300px] m:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                src={post.video.asset.url}>
              </video>
            </Link>

            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-5  w-[100px] md:w-[50px] lg:w-[600px] p-3'>
                <p className='text-2xl relative top-1 text-center'>Click on video to go to video details page </p>
                {/* these are the buttons for video */}
                {/* use useRef for changing state of video by button */}
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill
                      className='text-[#352d8b]  text-2xl lg:text-4xl' />
                  </button>
                ) :
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill 
                      className='text-[#9db831] text-2xl lg:text-4xl' />
                  </button>
                }

                {isVideoMuted ? (
                  <button onClick={()=> setIsVideoMuted(false)}>
                    <HiVolumeOff
                      className='text-[#352d8b] text-2xl lg:text-4xl' />
                  </button>
                ) :
                  <button onClick={()=> setIsVideoMuted(true)}>
                    <HiVolumeUp
                      className='text-[#9db831] text-2xl lg:text-4xl' />
                  </button>
                }

              </div>
            )}
          </div>
        </div>

      </div>


    </div>
  )
}

export default VideoCard