'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


type formData = {
    title: string,
    content: string
}

export default function Page() {
    
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');

    // create a post 
    const { mutate } = useMutation(async (data: formData) => await axios.post('/api/post/addPost', { data }), 
    {
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            toast.success('Posted 🥳', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            setTitle('');
            setContent('')
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { title, content };
        mutate(data);
    }

    return (
        <section className='bg-gradient-to-r from-blue-500 to-pink-500 w-[70%] mx-auto py-8 px-4 [&>*]:text-base rounded my-4'>
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
            <p className='text-base'>What's on your mind?</p>

            <form className='flex flex-col items-start py-8' onSubmit={handleSubmit}>
                <label id="title">Title</label>
                <input required placeholder="Title" name="title" value={title} onChange={e => setTitle(e.target.value)} className='rounded text-gray-700 w-[20rem] p-2' />

                <label id="content" className='pt-4'>Content</label>
                <textarea required placeholder="Content" maxLength={50} name="title" value={content} onChange={e => setContent(e.target.value)}  className='rounded text-gray-700 w-[20rem] p-2' />
                <div className={`${content.length === 50 ? 'animate-bounce pt-2' : ''}`}>{content.length} / {50}</div>
                <button type='submit' className='mt-4 text-base border-none bg-green-600 border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Post</button>
            </form>
            <Link href='/' type='submit' className='text-base border-none bg-green-600 border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Go to profile</Link>
        </section>
    )
}