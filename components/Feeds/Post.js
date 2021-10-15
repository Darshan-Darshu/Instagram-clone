import {
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import Moment from "react-moment";

function Post({ id, img, userImg, caption, username }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  console.log(likes);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return unsubscribe;
  }, [db, id]);

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex(
          (like) => like.id === session?.user?.uid
        ) !== -1
      ),
    [likes]
  );

  const likesPost = async () => {
    if (hasLiked) {
      await deleteDoc(
        doc(db, "posts", id, "likes", session.user.uid)
      );
    } else {
      await setDoc(
        doc(db, "posts", id, "likes", session.user.uid),
        {
          username: session.user.username,
          image: session.user.image,
        }
      );
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className='bg-white my-4 md:my-7 border rounded-sm'>
      <div className='flex items-center justify-between p-5'>
        <img
          src={userImg}
          alt=''
          className='rounded-full h-12 w-12 object-cover border mr-3'
        />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5' />
      </div>

      <img
        src={img}
        alt=''
        className='w-full object-cover'
      />

      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likesPost}
                className='btn text-red-500'
              />
            ) : (
              <HeartIcon
                onClick={likesPost}
                className='btn'
              />
            )}

            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn rotate-45' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}

      {likes.length > 0 && (
        <h1 className='flex-end text-sm font-bold cursor-pointer mt-2 mx-5'>
          {likes.length} likes
        </h1>
      )}

      <div className='flex items-center mx-5 mt-2 space-x-2 overflow-x-scroll scrollbar-track-black scrollbar-thin'>
        {likes.length > 0 &&
          likes.map((like) => (
            <img
              src={like?.data()?.image}
              alt=''
              className='w-10 h-10 rounded-full cursor-pointer '
            />
            // <h1>Hello</h1>
          ))}
      </div>

      <div>
        <p className='p-5 pt-3 truncate'>
          <span className='font-bold mr-1'>
            {username}{" "}
          </span>
          {caption}
        </p>
      </div>

      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='flex items-center space-x-2 mb-3'
            >
              <img
                src={comment.data().userImage}
                className='h-7 rounded-full'
                alt=''
              />
              <p className='text-sm flex-1'>
                <span className='font-bold mr-1 md:mr-2'>
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>

              <Moment fromNow className='pr-5 text-xs'>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border-none flex-1 focus:ring-0 outline-none'
            placeholder='Add a comment....'
          />
          <button
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold text-blue-500'
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
