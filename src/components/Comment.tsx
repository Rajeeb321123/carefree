import React, { Dispatch, SetStateAction,useEffect,useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';



import userAuthStore from 'store/authStore';
import NoResults from './NoResults';
import { IUser } from 'types'

interface Iprops {
  isPostingComment: Boolean,
  comment: string;

  // for set and add comment we have to have some parameter so we cant do as in commented code but like below it
  // setComment:()=>void;
  // addComment:()=>void;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;


  // comments is going to be array of string
  comments: Icomment[];

}


// creating interface Icomment as array for comments in Iprops
interface Icomment {
  comment: string;
  // length property is optional as we used '?'
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comment = ({ comment, setComment, addComment, comments, isPostingComment }: Iprops) => {

  const{fetchAllUsers,allUsers,userProfile}=userAuthStore();
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchAllUsers();
    setUsers(allUsers);
    setUser(userProfile);

  
    
  }, [fetchAllUsers,allUsers,userProfile],)
 

  return (
    <div className=' border-t-2 border-gray-200  px-10 pt-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[10px]'>
      <div className='overflow-scroll lg:h-[457px]'>
        {comments?.length ? (

          // here idx is used as key below
          comments.map((item, idx) => (
            <>
              {allUsers.map((user: IUser) => (user._id === (item.postedBy._id || item.postedBy._ref) && (
                <div className='p-2 items-center' key={idx}>
                  <Link href={`/profile/${user._id}`} >
                    <div className="flex items-start gap-3">
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
                  <div>
                    <p>
                      {item.comment}
                    </p>
                    </div>
                </div>
              )))}
            </>
          ))
        ) : (
          <NoResults text="No comments yet" />
        )}
      </div>

      {user && <div className=' m-4 bottom-0 left-0  pb-6 px-2 md:px-10 '>
        <form onSubmit={addComment} className='flex gap-4'>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='  px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-500 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            placeholder='Add comment..'
          />
          <button className='text-md text-gray-400 ' onClick={addComment} >
            {isPostingComment ? 'Commenting...' : 'Comment'}
          </button>

        </form>
      </div>}
    </div>
  )
}

export default Comment