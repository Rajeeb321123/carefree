import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';

import { client } from '../../utils/client';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    // patch is used for changing something in the client of postId (given)
    // setif missing means only for first like or if there was no like present before
    // insert ('after','like[-1]') means insert after end of array of like
    // if we have liked it
    const data =
      like ? await client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _key: uuid(),
            // we need reference to know who liked it
            _ref: userId,

          },
        ])
        .commit()


        // now for unliking the post
        : await client
          .patch(postId)
          // below we checking all the likes in like array for ref of userId given
          // then unset it 
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }

}