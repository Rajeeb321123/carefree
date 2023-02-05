import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
// importing the type of data directly from sanity . it is important to specify data of sanity in typescript
import { SanityAssetDocument } from '@sanity/client';


import userAuthStore from 'store/authStore'
import { client } from '@/utils/client';

// for select in UI we need topics
import { topics } from '@/utils/constants';
import { BASE_URL } from '@/utils'





const Upload = () => {

    const [isLoading, setIsLoading] = useState(false);

    // defining type in videasset i.e sanityasset documnet . for typescript
    //  use of '|' means 'or' 
    // we use 'or undefined' because it is undefined in the begining 
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    // topic[0] ensure first category is selected in the begining
    const [category, setCategory] = useState(topics[0].name);

    // state for saving the post
    const [savingPost, setSavingPost] = useState(false);

    // uploadVideo fuction
    const uploadVideo = async (e: any) => {
        // extracting the file and e.target.files means location of storage
        // it will open file explorer
        const selectedFile = e.target.files[0];

        // creating array of file types
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

        // checking if format is correct
        if (fileTypes.includes(selectedFile.type)) {
            setWrongFileType(false);
            setIsLoading(true);


            // tapping into client functionality of sanity
            client.assets
                .upload('file', selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                // it upload successful than use .then method
                // .then and .map is similar than Data.than((data))=>   Data is mapped to data
                .then((data) => {
                    setVideoAsset(data);
                    setIsLoading(false);
                });


        }
        else {
            setIsLoading(false);
            setWrongFileType(true);
        }

    }
    // using next router to switch to another page on post click
    const router = useRouter();

    // getting the userProfile
    // below syntax just means userProfile is an object of type any
    const { userProfile }: { userProfile: any } = userAuthStore();



    // handlepost
    // const handlePost = async () => {
    // imp: remember we have already upload in sanity cache above in upload video
    // imp: we can use its videoAsset._id as reference
    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true);

            const doc = {
                // look at schema in sanity file to understand properly
                // in caption we didnt wrote  caption : caption because typescript will do it automatically
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    // for asset like video,image we have do like below asset:{}
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id,
                    },
                },
                // we can get userProfile from userAuthstore in  authstore.ts
                userId: userProfile?._id,
                // definig posted by
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                topic: category,
            };
            // using axios to send document to post in pages/api/post
            await axios.post(`${BASE_URL}/api/post`, doc);

            router.push('/');
        }
    };




    return (


        <div className='flex w-full h-full absolute left-0 top-[60px] lg:top-[70px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center' >



            <div className='bg-white rounded-lg xl:h-[80vh] flex gap-6  w-[60%] flex-wrap justify-between items-center p-14 pt-6'>



                <div>
                    <div>
                        <p className='text-2xl font-bold '>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col  justify-center items-center outline-none mt-10  w-[260px] h-[460px] p-10  cursor-pointer hover:border-blue-300 hover:bg-gray-100'>



                        {isLoading ? (
                            <p>Uploading.....</p>

                        ) : (
                            <div>
                                {/* when we have video already selected */}
                                {videoAsset ? (
                                    <div>

                                        <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'></video>

                                    </div>
                                ) : (
                                    <label className='cursor-pointer '>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center h-full'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudDownloadAlt className="text-gray-300 text-6xl" />
                                                </p>
                                                <p className='font-semibold text-xl text-blue-300 '>
                                                    Upload Video
                                                </p>

                                                <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                    MP4 or WebM or ogg
                                                    <br />
                                                    720 X 1280 or higher
                                                    <br />
                                                    Up to 10 minutes
                                                    <br />
                                                    Less than 2GB
                                                </p>

                                                <p className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-10 rounded text-white text-md font-medium p-2 w-52 text-center outline-none'>
                                                    Select File
                                                </p>

                                            </div>
                                            <input type="file" className="w-0 h-0" name="upload-video" onChange={uploadVideo} />
                                        </div>

                                    </label>)
                                }

                            </div>
                        )
                        }


                        {/* checking if wrong file type is uploaded */}
                        {wrongFileType && (
                            <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Please select  a Video file </p>
                        )}


                    </div>
                </div>







                <div className='flex flex-col gap-3 pb-10 '>
                    {/* for form */}
                    <label className='text-md font-medium text-[#808000]'>
                        caption
                    </label>
                    {/* e.target.value simply means value of key press and without it we cant type  */}
                    {/* e.target.value is also used in key press in options  */}
                    <input type='text' value={caption} onChange={(e) => setCaption(e.target.value)} className=" rounded outline-none text-md border-2 border-gray-200 p-2" />
                    <label className='text-md font-medium  text-[#808000]'>
                        Choose a category
                    </label>
                    {/* We have loop all the available category in select */}
                    <select onChange={(e) => setCategory(e.target.value)} className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer">

                        {topics.map((topic) => (
                            <option key={topic.name} className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300">
                                {topic.name}
                            </option>
                        ))}


                    </select>
                    <div className="flex gap-6 mt-10">
                        <button onClick={() => { }} type='button' className=' bg-[#ff0019]  text-white border-gray-300 border-2 text-md font-medium p-2 rounder w-28 lg:w-44 outline-none'>
                            Discard

                        </button>
                        <button onClick={handlePost} type='button' className='bg-[#7fffd4] border-2 text-white text-md font-medium p-2 rounder w-28 lg:w-44 outline-none'>
                            Post

                        </button>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default Upload