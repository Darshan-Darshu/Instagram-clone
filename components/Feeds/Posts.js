import Post from "./Post";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "@firebase/firestore";

const dummy_data = [
  {
    id: "1",
    username: "darshan darshu",
    userImg:
      "https://images.unsplash.com/photo-1529946179074-87642f6204d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    img: "https://static.toiimg.com/thumb/msid-54559212,width-748,height-499,resizemode=4,imgsize-307081/.jpg",
    caption: "Darshan",
  },
];

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db]);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
