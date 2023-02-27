'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type PropsData = {
    userId: string,
    thought: any,
}

const getCommentedUser = async (id) => {
    const response = await axios.get(`/api/post/currentUser/${id}`);
    return response.data;
}

export default function EachComment({ userId, thought }: PropsData) {

    const theUserId = userId;

    const { data, isLoading, error } = useQuery(['user', theUserId], () => getCommentedUser(theUserId));


    return (
        <div className='bg-gray-100 p-2 rounded'>
            { data && (
                <div className='flex items-center gap-2 p-2'>
                    <span>{data[0]?.name.split(" ")[0]}</span>
                    <Image alt="user-image" className='animate-pulse' style={{ borderRadius: "100%"}} width={20} height={20} src={data[0]?.image || ""} />
                </div>
            )}
            <p className='bg-gray-200 p-2 w-full rounded'>{thought}</p>
        </div>
    )
}