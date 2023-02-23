import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if(req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        
        if(!session?.user) {
            return res.status(401).json({ msg: 'SignIn first to comment!'});
        }


        try{
            const userComment = req.body.data.comment;
            const postId = req.body.data.postId;

            const currentUser = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email
                }
            });

            const post = await prisma.comment.create({
                data: {
                    thought: userComment,
                    userId: currentUser?.id,
                    postId
                }
            });

            res.status(200).json(post);
        } catch(e) {
            res.status(401).json({ message: 'Error has occured while making a post!'})
        }

    }
}

