'use client'

import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <button onClick={() => signIn()} className='block mx-auto mt-10 hover:border-gray-500 text-base bg-transparent border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Login</button>
    )
}