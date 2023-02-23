import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '@/prisma/client'

type Data = {
  title: string,
  content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'POST') {
        const session = await getServerSession(req, res, authOptions);
        if(!session) {
            return res.status(401).json({ msg: 'SignIn first to make a post!'});
        }

        const title: string = req.body.data.title;
        const content: string = req.body.data.content;

        //get current user
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        });

        try{
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    userId: currentUser.id
                }
            });

            res.status(200).json(post);
        } catch(e) {
            res.status(401).json({ message: 'Error has occured while making a post!'})
        }
    }
}

