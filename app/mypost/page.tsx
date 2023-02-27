'use client'

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import EachPost from '../components/each-post';
import Loader from "../components/loader";


const getAllPosts = async () => {
    const response =  await axios.get('/api/post/getPost');
    return response.data;
}

export default function Post() {

    const { data, error, isLoading } = useQuery({
        queryFn: getAllPosts,
        queryKey: ["posts"]
    });

    if(error) return error;

    return (
        <section className='min-h-[95vh] bg-gradient-to-r from-blue-500 to-pink-500 w-[70%] mx-auto py-8 px-4 [&>*]:text-base rounded my-4'>
            <p className='text-base'>Hey! things you've posted so far.</p>
            { isLoading && <Loader /> }
            { !isLoading && data.map(post => (
                <EachPost key={post.id} {...post} />  
            ))}
            <Link href='/' type='submit' className='text-base border-none bg-green-600 border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Go to profile</Link>
        </section>
    )
}