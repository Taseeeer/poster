'use client';

import Image from "next/image";

type PropsData = {
    showComments: boolean,
    comment: any
}

export default function EachComment({ showComments, comment }: PropsData) {
    
    return (
        <div key={comment.id} className='bg-gray-100 p-2 rounded'>
            <div className='flex items-center gap-4 py-2'>
                <Image alt="user-image" className='animate-pulse' style={{ borderRadius: "100%"}} width={30} height={30} src={comment?.user?.image || ""} />
                <span>{comment?.user?.name.split(" ")[0]}</span>
            </div>
            <p className='bg-gray-200 p-2 w-full rounded'>{comment.thought}</p>
        </div>
    )
}