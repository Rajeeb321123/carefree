import { client } from '@/utils/client';
import { postDetailQuery } from '@/utils/queries';
import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   // for getting the video in detail page when we click it
   if (req.method === 'GET') {

      // as in [id].tsx we have writtern `${BASE_URL}/api/post/${id}` , id is passed in req and our file name is [id].ts here so, 
      // we can get id by simply writing below code 
      const { id } = req.query;


      //  now we can form our sanity query
      const query = postDetailQuery(id);

      // now getting actual data 
      const data = await client.fetch(query);

      // returning response to detail page or [id].tsx page 
      // data[0] means first element of array
      res.status(200).json(data[0])
   }


   //  now for putting the comment from detail page
   // and also g
   else if (req.method === 'PUT') {
      const { comment, userId } = req.body;
      const { id }: any = req.query;

      const data =await client
        .patch(id)
        .setIfMissing({ comments: [] })
        // insert ('after','comment[-1]') means insert after end of array of comment
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuid(),
            // we need reference to know who liked it
            postedBy:{_type:'postedBy',_ref:userId}

          },
        ])
        .commit()
      
      
      res.status(200).json(data);
   }
}