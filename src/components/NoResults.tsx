import React from 'react'
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md';

interface Iprops{
  text:string;
}


// below way of text:Iprops is not proper way but alright for simple text
const NoResults = ({text}:Iprops) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        {text === "No comments yet"? <BiCommentX/>:<MdOutlineVideocamOff/>}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  )
}

export default NoResults