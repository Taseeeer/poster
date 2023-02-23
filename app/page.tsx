
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

import { SiNextdotjs, SiRailway, SiPrisma, SiTailwindcss } from "react-icons/si";
import Login from './components/login';
import Singout from './components/signout';
import Image from 'next/image';

export default async function Home() {

  const session = await getServerSession(authOptions);

  return (
    <section>
      <div className={`bg-red-500 w-[50rem] mx-auto rounded-md mt-6 py-[4rem] ${!session?.user ? 'bg-gradient-to-r from-green-200 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-pink-500'}`}>
        <p className='text-center text-[2.5rem]'>Poster.</p>
        { !session?.user ? <p className='text-center text-base'>You can post your stuff in here.</p> : 
        <div className='flex justify-center py-4 items-center gap-4'>
          <p className='text-center text-2xl'> {session?.user?.name?.split(' ')[0]} </p>
          <div className='animate-pulse'>
            <Image alt="user-iamge" style={{ borderRadius: "100%"}} width={50} height={50} src={session?.user?.image || ""} />
          </div>
        </div>
        }
        { !session?.user && <Login /> }
        { session?.user && <Singout />}
      </div>

      <div className='py-4'>
        <p className='text-center text-base'>This app is powered by</p>
        <div className='flex justify-center [&>*]:text-[2.5rem] gap-4 py-4'>
          <SiNextdotjs />
          <SiTailwindcss />
          <SiRailway />
          <SiPrisma />
        </div>
      </div>
    </section>
  )
}
