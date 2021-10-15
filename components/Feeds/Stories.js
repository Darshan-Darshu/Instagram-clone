import Story from "./Story";
import faker from "faker";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);
  console.log(suggestions);
  return (
    <div className='flex space-x-2 p-3 md:p-6 bg-white md:mt-6 border-gray-200 border border-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <Story
          img={session.user.image}
          username={session.user.username}
        />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
