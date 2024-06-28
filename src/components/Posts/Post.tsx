'use client';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Comment from '@/components/Comment';
import CommentsModal from '@/components/Posts/CommentsModal';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import LikeModal from '@/components/Posts/LikeModal';
import CommentForm from '../Forms/CommentForm';
interface PostProps {
  profileImage: string;
  username: string;
  isAdmin: boolean;
  postContent: string;
  likes: {}[];
  comments: {}[];
}
const Post = ({
  profileImage,
  username,
  isAdmin,
  postContent,
  likes,
  comments,
}: PostProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const firstFiveComments = comments.slice(0, 5);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-3xl my-5">
      <div className="flex items-center gap-x-3">
        <Link
          className="flex items-center gap-2 cursor-pointer"
          href={`/user/${username}`}
        >
          <Avatar className=" w-[40px] h-[40px] z-10 items-center border-2 border-lightPink  shadow-3xl">
            {!profileImage ? (
              <AvatarFallback className="bg-black">
                <FaUser className="text-white" size={100} />
              </AvatarFallback>
            ) : (
              <CldImage
                width="180"
                height="180"
                crop={'fill'}
                src={profileImage}
                sizes="100vw"
                alt="Tribe profile"
              />
            )}
          </Avatar>
          <p className="font-bold text-xl">{username}</p>
        </Link>

        {isAdmin && <p className="text-sm text-lightPink">Admin</p>}
      </div>
      <div className="w-full bg-lighterPink rounded-2xl p-5 mt-6 mb-4">
        <p>{postContent}</p>
      </div>
      <div className="flex justify-between items-center mx-2">
        {likes.length > 0 && (
          <p
            className="text-purple cursor-pointer"
            onClick={() => setOpenLikeModal(true)}
          >
            {likes.length} Likes
          </p>
        )}
        {comments.length > 0 && (
          <p
            className="text-lightPink cursor-pointer"
            onClick={() => setOpenCommentModal(true)}
          >
            {comments.length} comments
          </p>
        )}
      </div>
      <CommentForm />
      <CommentsModal
        isOpen={openCommentModal}
        onRequestClose={() => setOpenCommentModal(false)}
        comments={comments}
      />
      <LikeModal
        isOpen={openLikeModal}
        onRequestClose={() => setOpenLikeModal(false)}
        likes={likes}
      />
      {comments.length > 0 && (
        <div className="bg-gray-100 p-3 rounded-2xl ">
          {firstFiveComments.map((comment) => (
            <Comment
              profileImage=""
              username="Etah"
              comment="This is a great post"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
