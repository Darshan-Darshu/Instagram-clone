import Image from "next/image";
import {
  SearchIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import {
  signIn,
  useSession,
  signOut,
} from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtoms";
import { useState } from "react";
import Sidebar from "./Sidebar";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const [openSidebar, setOpenSidebar] = useState(false);

  const homepagehandler = () => {
    router.push("/");
  };

  const openModalHandler = () => {
    setOpen(true);
  };

  const openSidebarHandler = () => {
    setOpenSidebar(true);
  };

  const closeSidebarHandler = () => {
    setOpenSidebar(false);
  };

  return (
    <>
      {openSidebar && (
        <header className='md:hidden'>
          <Sidebar
            closeHeader={closeSidebarHandler}
            openModal={openModalHandler}
          />
        </header>
      )}
      {!openSidebar && (
        <header className='shadow-md border-b bg-white sticky top-0 z-50'>
          <div className='flex justify-between items-center max-w-6xl mx-3 md:mx-5 lg:mx-auto '>
            <div
              className='hidden md:inline-grid relative h-16 w-24 cursor-pointer'
              onClick={homepagehandler}
            >
              <Image
                src='https://links.papareact.com/ocw'
                layout='fill'
                objectFit='contain'
              />
            </div>

            <div
              className='md:hidden relative h-10 w-10 flex-shrink-0 cursor-pointer'
              onClick={homepagehandler}
            >
              <Image
                src='https://links.papareact.com/jjm'
                layout='fill'
                objectFit='contain'
              />
            </div>

            <div className='max-m-xs'>
              <div className='relative mt-1 p-3 rounded-md'>
                <div className='absolute top-0 inset-y-0 pl-3 flex items-center pointer-events-none'>
                  <SearchIcon className='h-5 w-5 text-gray-500' />
                </div>
                <input
                  type='text'
                  placeholder='Search'
                  className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray focus:ring-black focus:border-black rounded-md'
                />
              </div>
            </div>

            <div className='flex items-center space-x-4 justify-end'>
              <HomeIcon
                className='navBtn'
                onClick={homepagehandler}
              />
              <MenuIcon
                className='md:hidden h-6 cursor-pointer flex-shrink-0'
                onClick={openSidebarHandler}
              />
              {session ? (
                <>
                  <div className='relative navBtn'>
                    <PaperAirplaneIcon className='navBtn rotate-45' />
                    <div className='absolute -top-1 -right-1 text-xs w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center animate-pulse'>
                      3
                    </div>
                  </div>
                  <PlusCircleIcon
                    className='navBtn'
                    onClick={openModalHandler}
                  />
                  <UserGroupIcon className='navBtn' />
                  <HeartIcon className='navBtn' />

                  <img
                    onClick={signOut}
                    src={session.user.image}
                    alt=''
                    className='h-10 w-10 rounded-full cursor-pointer object-cover'
                  />
                </>
              ) : (
                <button
                  className='text-sm w-12 md:text-md'
                  onClick={signIn}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
