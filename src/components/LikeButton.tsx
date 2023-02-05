import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import beer from '../utils/beer.png'
import cheers from '../utils/cheers.png'
import Image from 'next/image';


import userAuthStore from 'store/authStore';

interface IProps {
  likes: any;
  flex: string;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, flex, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = userAuthStore();
  const [likeIcon, setLikeIcon] = useState(beer);
//   here we are filtering the likes of user from like array
  let filterLikes = likes?.filter((item: any) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
      setLikeIcon(cheers);
    } else {
      setAlreadyLiked(false);
      setLikeIcon(beer);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className='mt-2 ml-1 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          // <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] ' onClick={handleDislike} >
          //   <MdFavorite className='text-lg md:text-2xl' />
          // </div>

          <div className=' p-2 md:p-4 bg-slate-400 rounded-full  '>
            <Image src={likeIcon} className='h-9 w-7' alt="beer" onClick={handleDislike} />
          </div>
        ) : (
          // <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike} >
          //   <MdFavorite className='text-lg md:text-2xl' />
          // </div>
          <div className=' p-2 md:p-4 bg-slate-400  rounded-full '>
          <Image src={likeIcon} alt="beer" onClick={handleLike} className='h-9 w-7'/>
        </div>
        )}
        <p className='text-md font-semibold '>{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;