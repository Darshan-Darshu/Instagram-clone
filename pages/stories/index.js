import {
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  XIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import storyImg from "../../util/dummyStory";

export default function Home() {
  const randomImg = Math.floor(Math.random() * 21);
  const router = useRouter();
  const { img, username } = router.query;

  const cancelStoryHandler = () => {
    router.replace("/");
  };

  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram - Darshan Darshu</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='bg-instagramColor h-screen w-screen'>
        <nav className='relative flex items-center justify-between bg-gray-600 px-4 md:px-8 z-50'>
          <div className='hidden absolute top-0 left-0 md:left-6 md:inline-grid h-16 w-24 cursor-pointer'>
            <Image
              src='https://www.logo.wine/a/logo/Instagram/Instagram-Logo.wine.svg'
              layout='fill'
              objectFit='contain'
            />
          </div>

          <XIcon
            className='h-6 absolute top-5 right-4 text-white cursor-pointer'
            onClick={cancelStoryHandler}
          />
        </nav>
        <main className='h-full flex items-center sm:max-w-[450px] mx-auto relative'>
          <div className='absolute top-3 md:top-8 left-6 md:left-6 h-12 flex-shrink-0 cursor-pointer w-full'>
            <div className='flex items-center text-white'>
              <img
                src={img}
                className='rounded-full w-12 h-full object-cover'
              />
              <h1 className='ml-4 text-md font-semibold'>
                {username}
              </h1>
            </div>
            <DotsHorizontalIcon className='hidden md:inline-flex h-8 absolute top-3 right-10 text-white' />
          </div>
          <div className='w-screen h-screen lg:h-[720px] lg:w-full rounded-md'>
            <img
              src={storyImg[randomImg]}
              className='h-full w-full object-cover md:rounded-md'
              alt=''
            />
          </div>
          <div className='absolute bottom-4 w-full'>
            <form className='flex items-center p-4 '>
              <input
                type='text'
                className='bg-transparent rounded-3xl w-full flex-1 focus:ring-0 focus:border-white border-white text-sm p-3 text-white'
                placeholder='Write a Message....'
              />
              <PaperAirplaneIcon className='text-white h-8 w-8 ml-3 -mt-2 inline-flex rotate-45 cursor-pointer' />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
