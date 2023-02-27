import prisma from '@/prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions);

        if(!session?.user) {
            return res.status(401).json({ msg: 'SignIn first to get post!'});
        }
        const commentedUserId = req.query.id;
        
        try {
            const result = await prisma.user.findMany({
                where: {
                    id: commentedUserId
                } 
            });
            res.status(200).json(result);
        } catch(e) {
            res.status(401).json({ message: 'Error has occured while getting a post!'})
        }

    }
}


