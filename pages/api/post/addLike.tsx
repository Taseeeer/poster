import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ msg: 'SignIn first to like!' });
    }

    try {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: session?.user?.email
        }
      });

      //clee4bw9j0000lqoh854ytmtt
      //cledw7lip0000lq75wpcu2w0k

      const upsertLike = await prisma.like.upsert({
        where: {
          postId: req.body.data.id,
        },
        update: {
          likes: {
            increment: 1
          }
        },
        create: {
          likes: 1,
          postId: req.body.data.id,
          userId: currentUser.id
        },
      })


      return res.status(200).json(upsertLike);

    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'Error has occured while making a like!' })
    }

  }
}