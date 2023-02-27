'use client';

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BiLike } from "react-icons/bi";

type propsData = {
    id: string,
    userId: string,
    like: any
}

export default function EachLike({ id, userId, like }: propsData) {

    const data = { like: 1, id: id}
    const { mutate } = useMutation(async (data) => axios.post('/api/post/addLike', { data }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(data);
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className='flex block text-df cursor-pointer hover:scale-110 hover:text-blue-400'>
                <button type='submit'>
                    <BiLike className={`${userId === like[0]?.userId ? 'text-blue-600' : null}`} />
                </button>
            </form>
        </section>
    )
}