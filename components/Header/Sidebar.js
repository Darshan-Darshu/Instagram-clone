import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Image from "next/image";

function Sidebar({ closeHeader, openModal }) {
  const { data: session } = useSession();

  const closeSidebarHandler = () => {
    closeHeader();
  };

  const openModalHandler = () => {
    openModal();
  };

  return (
    <div className='z-50 transform transition-all duration-300 ease-out mb-5'>
      <div className='flex justify-between items-center bg-white shadow-md px-4 py-5'>
        <div className='md:hidden relative h-10 w-10 flex-shrink-0 cursor-pointer'>
          <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <XIcon
          className='h-6'
          onClick={closeSidebarHandler}
        />
      </div>

      <div className='flex items-center justify-between mt-5 px-5'>
        {session && (
          <>
            <img
              src={session.user?.image}
              className='h-12 w-12 rounded-full object-cover'
              alt=''
            />
            <div className='flex-1 ml-4'>
              <h1 className='text-sm font-semibold'>
                {session.user.username}
              </h1>
              <p className='text-xs text-gray-500'>
                {session.user.email}
              </p>
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col space-y-2 px-8 mt-4'>
        {!session && (
          <h1 className='text-sm'>
            Welcome to{" "}
            <span className='text-md font-semibold text-red-400'>
              Darshan Darshu
            </span>{" "}
            Clone
          </h1>
        )}

        {session ? (
          <>
            <div className='flex items-center'>
              <HomeIcon className='h-6' />
              <h1 className='text-sm font-semibold ml-4'>
                Home
              </h1>
            </div>

            <div className='relative flex items-center'>
              <PaperAirplaneIcon className='h-6 rotate-45' />
              <div className='absolute top-0 left-3 text-xs w-3 h-3 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse'>
                3
              </div>
              <h1 className='text-sm font-semibold ml-4'>
                Messages
              </h1>
            </div>
            <div
              className='flex items-center mb-4'
              onClick={openModalHandler}
            >
              <PlusCircleIcon className='h-6' />
              <h1 className='text-sm font-semibold ml-4'>
                Upload Image
              </h1>
            </div>
            {/* <UserGroupIcon className='navBtn' />
            <HeartIcon className='navBtn' /> */}
          </>
        ) : (
          <button
            onClick={signIn}
            className='w-full py-2 bg-blue-400 text-white my-3 rounded-md'
          >
            Sign In
          </button>
        )}

        {session && (
          <div>
            <button
              onClick={signOut}
              className='w-full py-2 bg-blue-400 text-white my-3 rounded-md'
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
