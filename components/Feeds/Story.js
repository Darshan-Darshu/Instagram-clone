import { useRouter } from "next/router";

function Story({ img, username }) {
  const router = useRouter();

  const storyShowHandler = () => {
    router.push({
      pathname: "/stories",
      query: {
        img,
        username,
      },
    });
  };

  return (
    <div onClick={storyShowHandler}>
      <img
        src={img}
        alt=''
        className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out'
      />
      <p className='text-sm w-14 truncate text-center'>
        {username}
      </p>
    </div>
  );
}

export default Story;
