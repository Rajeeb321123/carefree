
import { client } from '@/utils/client';
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    // ==GET is for showing video or document in main video from sanity
    if(req.method==='GET'){
        // getting our query
        const query = allPostsQuery();

        // fetching data from client
        // set up our client in utilis folder
        const data= await client.fetch(query);
        res.status(200).json(data);
    }

    // ===POST is for posting the video or document  from post  request from Upload.tsx
    else if (req.method === 'POST') {
      const document= req.body;
  
      client.create(document).then(() => {
        res.status(200).json('video created');
      });
    }

}
