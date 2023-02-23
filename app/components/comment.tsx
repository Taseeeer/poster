'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { CiCircleCheck, CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import EachComment from "./each-comment";

const getAllComments = async () => {
    const response = await axios.get('/api/post/getComments');
    return response.data;
}

export default function Comment({ id, isComment }: { id: string, isComment: boolean }) {
    
    const [ comment, setComment ] = useState('');
    const [ showComments, setShowComments ] = useState(false);

    const { mutate } = useMutation(async (data) => await axios.post('/api/post/addComment', { data }), {
        onSuccess: (data) => {
            toast.success('Comment posted 😁', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            setComment('');
        }
    });

    const { data, error, isLoading} = useQuery({
        queryFn: getAllComments,
        queryKey: ['comments']
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            comment,
            postId: id
        }
        mutate(data);
    }

    return (
        <div>
        <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
        />

        <div className='px-2 rounded py-4 flex flex-col gap-1'>
            { isLoading && <p>Comments are loading...</p>}
            { !isLoading && <div className='flex items-center gap-4 bg-gray-100 w-max p-2 rounded'><p className='text-base'>{data.length} comments on this post</p> <span onClick={() => setShowComments(!showComments)} className='text-2xl cursor-pointer'>{showComments ? <CiCircleChevUp /> : <CiCircleChevDown />}</span></div> }
            { (data && showComments) && data.map(comment => <EachComment comment={comment} showComments={showComments} />)}
        </div>
        { isComment && (
            <form className='flex items-center justify-between gap-2 bg-gray-200 rounded px-2 mx-2' onSubmit={handleSubmit}>
                <input placeholder='Comment' required className='w-full p-1 text-sm border rounded my-2 bg-gray-200' onChange={e => setComment(e.target.value)} />
                <button type='submit' className='p-2 bg-gray-100 text-xl rounded'>
                    <CiCircleCheck className='text-blue-700' />
                </button>
            </form>
        )}
        </div>
    )
}