'use client'

import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Singout() {
    return (
        <div className='flex items-center'>
            <Link className='block mx-auto mt-10 hover:scale-110 text-base bg-transparent border border-rose-100 px-5 py-2 cursor-pointer rounded-md' href='/dashboard'>Dashboard</Link>
            <Link href='/mypost' className='block mx-auto mt-10 hover:scale-110 text-base bg-transparent border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Posts</Link>
            <button onClick={() => signOut()} className='block mx-auto mt-10 hover:scale-110  text-base bg-transparent border border-rose-100 px-5 py-2 cursor-pointer rounded-md'>Signout</button>
        </div>
    )
}