// in nextjs file based routing [id].tsx means is dynamic in nature or [id] changes in accordance to file or video selected


import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '@/utils'
import { Video } from 'types'
import userAuthStore from 'store/authStore'

import Comment from '@/components/Comment'
import LikeButton from '@/components/LikeButton'

const css = { width: '100%', height: 'auto' }


interface Iprops {
  postDetails: Video,
}

const Detail = ({ postDetails }: Iprops) => {

  const { userProfile }: any = userAuthStore();
  // below post State will help to manually change the state of postDetails eg : we will automatically see increase in likes if we like the post
  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment,setIsPostingComment] =useState(false);

  


  const onVideoClick = () => {
    if (!playing) {
      // current will provide current property using useRef
      videoRef?.current?.play();
      setPlaying(true)
      
    }
    
  }

  if (!post) return null;
  useEffect(() => {
    
    if (post && videoRef?.current) {
      // isVideomuted is boolean value
      videoRef.current.muted = isVideoMuted
    }

    // below[] is for dependencies and it is used whenever they are altered
  }, [post, isVideoMuted]);



  // for handling like and updating all  (likes from post) by spreading 
  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, { userId: userProfile._id, postId: post._id, like })

      // ...post means spreading the previous state of post 
      // updating the post's property with new data
      setPost({ ...post, likes: data.likes });
    }
  }


  // for adding comments and getting  that comments and updating in all the (comments that we got from post) by spreading
  const addComment =async(e:any) =>{
    e.preventDefault();
    if(userProfile && comment){
      const {data} =await axios.put( `${BASE_URL}/api/post/${post._id}`,{
        userId:userProfile._id,
        comment
      });

      setPost({ ...post,comments:data.comments });
      setComment('');
      setIsPostingComment(false);


      
    }
  }



  const router = useRouter();


  return (
    <div className='flex  h-full w-full absolute left-0 top-0 bg-white flex-wrap  lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px]  lg:w-full xl:w-[70%] flex justify-center items-center  bg-scroll bg-center ' style={{
        backgroundImage: "url(https://media.wired.co.uk/photos/606dba919f060d3b864d741b/master/w_1600,c_limit/nasa.jpg)"
      }} >
        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p >
            {/* imp:how to use of router.back() */}
            {/*router.back will just get back to previous url   */}
            <MdOutlineCancel className='  h-4 hover:h-5 text-white lg:opacity-10 text-[35px] hover:opacity-90 cursor-pointer' onClick={() => router.back()} />
          </p>

        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video

              controls
              ref={videoRef}
              onClick={onVideoClick}
              loop
              src={post?.video?.asset.url}
              className=' h-full cursor-pointer '
            >

            </video>
            
          </div>

          <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-3 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff
                className=' text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp
                className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-[1000px]  md:w-[1000px] lg:w-full xl:w-[440px]">
        <div className='lg:mt-20 mt-10'>

          <Link href={`/`}>
            <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
              <Image
                width={60}
                height={60}
                alt='user-profile'
                className='rounded-full'
                src={post.postedBy.image}
              />
              <div>
                <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                  {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400 text-xl' />
                </div>
                <p className='text-md'> {post.postedBy.userName}</p>
              </div>
            </div>
          </Link>
          <div className='px-12'>
            <p className=' text-md text-gray-600'>{post.caption}</p>
          </div>

          <div className='mt-10 px-10'>
            {/* likebutton */}
            {/* we can like if we are logged in */}
            {userProfile && <LikeButton
                  likes={post.likes}
                  flex='flex'
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />}
              
          </div>
          <Comment 
            comment={comment}  
            comments={post.comments}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
          />



        </div>
      </div>

    </div>
  )
}

export default Detail

// we can fetch data with id in url 
export const getServerSideProps = async ({ params: { id } }: { params: { id: String } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)


  //in nextjs getserverSideProps whatever we put in props below bcan send it to page above as props to be populated inside real props on detail page above 
  return {
    props: { postDetails: data }
  }

}