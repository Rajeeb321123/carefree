import type { NextApiRequest, NextApiResponse } from 'next';

import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
    if(req.method==='GET'){
        const {id}:any=req.query;

        // for finding the user
        const query =singleUserQuery(id);

        // geting the user video from query
        const userVideosQuery= userCreatedPostsQuery(id);
        const userLikedVideosQuery= userLikedPostsQuery(id);

        const user =await client.fetch(query);
        const userVideos=await client.fetch(userVideosQuery);
        const userLikedVideos =await client.fetch(userLikedVideosQuery);


        // user[0] means first profile matches
        res.status(200).json({user:user[0],userVideos,userLikedVideos})



    }
}