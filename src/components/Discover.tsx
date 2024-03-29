import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import{topics} from '../utils/constants'

const Discover = () => {

    // to extract data from current url use router and extract from router
    const router =useRouter();
    const {topic}=router.query;


    const activeTopicStyle ='xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2  xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]'
    const topicStyle='  bg-[#F8B195] xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2  xl:rounded-none flex items-center gap-2 justify-center cursor-pointer text-[#F51997]'
  return (
    <div className='xl:border-b-2  border-gray-200 pb-6 '>
        <p className='text-gray-500 font-semibold m-3  mt-4 hidden xl:block'>
            Popular Topics

        </p>
        <div className='flex gap-1 flex-wrap'>
            {topics.map((item)=>(
                <Link href={`/?topic=${item.name}`} key={item.name}>
                    {/* below we use data extracted from url or router to change looks of categories */}
                    <div className={topic==item.name?activeTopicStyle:topicStyle}>
                        <span className='font-bold text-2xl xl:text-md s'>
                            {item.icon}
                        </span>
                        <span className='font-medium text-md hidden xl:block capitalize'>
                            {item.name}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Discover