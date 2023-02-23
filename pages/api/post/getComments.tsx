import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions);
        if(!session) {
            return res.status(401).json({ msg: 'SignIn first to get comment!'});
        }

        try {
            const result = await prisma.comment.findMany({
                include: {
                    user: true
                }
            });
            res.status(200).json(result);
        } catch(e) {
            res.status(401).json({ message: 'Error has occured while getting a post!'})
        }
    }
}


