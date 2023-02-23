'use client';

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import Comment from "./comment";

type propsData = {
    id: string,
    title: string,
    content: string,
    user: any
}

export default function EachPost({ id, title, content, user }: propsData) {

    const [ isComment, setIsComment ] = useState(false);

    const { mutate } = useMutation(async (data) => await axios.post('/api/post/deletePost', { data }), {
        onSuccess: (data) => {
            toast.success('Post deleted!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    });


    const handleDelete = async (id: string) => {
        mutate(id)
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
            <div className='shadow-md bg-white text-gray-700 my-2 w-[20rem] rounded-xl p-4 w-full'>
                <div className='flex items-center justify-between bg-gray-100 px-4 py-2 rounded-xl'>
                    <p>{user.name.split(" ")[0]}</p>
                    <Image alt="user-image" className='animate-pulse' style={{ borderRadius: "100%"}} width={30} height={30} src={user?.image || ""} />
                </div>
                <div className='flex items-center justify-between p-2'>
                    <p className='text-[1.5rem] py first-letter:uppercase first-letter:text-[2rem]'>{title}</p> 
                    <CiTrash onClick={() => handleDelete(id)} className='text-red-500 cursor-pointer hover:scale-105 text-[1.5rem]' />
                </div>
                <p className='text-base p-2'>{content}</p> 
                <button className='p-2 ml-2 my-2 bg-gray-100 text-base rounded' onClick={() => setIsComment(!isComment)}>Comment</button>
                <Comment id={id} isComment={isComment} /> 
            </div>
        </div>
    )
}