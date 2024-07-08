'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUser, FaThumbsUp, FaRegThumbsUp, FaComment } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { formatDateTime, getDuration } from '@/util/DateTime';
import { Button } from '@/components/ui/button';
import { create_comment_like } from '@/action/like/create-like';
import LikeModal from '@/components/Posts/LikeModal';
import CommentResponseForm from '../Forms/CommentResponseForm';
import { useCurrentUser } from '@/hooks/use-current-user';
interface CommentProps {
  profileImage: string;
  username: string;
  comment: string;
  commentLiked: boolean;
  commentLikes: { user: { username: string; image: string } }[];
  createdAt: string;
  commentId: string;
  replies: {
    author: { username: string; image: string };
    content: string;
    id: string;
    createdAt: string;
    likes: { user: { username: string; image: string; id: string } }[];
    parentId: string;
    replies: {
      author: { username: string; image: string };
      content: string;
      id: string;
      createdAt: string;
      likes: { user: { username: string; image: string; id: string } }[];
      parentId: string;
    }[];
  }[];
}
const Comment = ({
  profileImage,
  username,
  comment,
  commentLiked,
  createdAt,
  commentId,
  commentLikes,
  replies,
}: CommentProps) => {
  const [like, setLike] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [responding, setResponding] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { user } = useCurrentUser();
  const Liked = () => {
    if (!commentLiked) {
      setLike(true);
      create_comment_like(commentId);
    }
  };
  const NowDateTime = new Date();
  const theDuration = getDuration(createdAt, NowDateTime.toISOString());
  const duration =
    parseInt(theDuration.minutes) < 60
      ? Math.floor(parseInt(theDuration.minutes)) + ' m'
      : theDuration.hours < 48
      ? Math.floor(theDuration.hours) + ' h'
      : Math.floor(theDuration.days) < 30
      ? Math.floor(theDuration.days) + ' days'
      : theDuration.weeks.weeks + 'w';
  return (
    <div className="flex flex-col gap-y-1 border-b-2 border-b-gray-200 m-2 pb-2">
      <Link
        href={`/user/${username}`}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <Avatar className=" w-[30px] h-[30px] items-center border-2 border-lightPink  shadow-3xl">
          {!profileImage ? (
            <AvatarFallback className="bg-black">
              <FaUser className="text-white" size={50} />
            </AvatarFallback>
          ) : (
            <CldImage
              width="50"
              height="50"
              crop={'fill'}
              src={profileImage}
              sizes="100vw"
              alt="Tribe profile"
            />
          )}
        </Avatar>
        <div className="">
          <p className="font-semibold">{username}</p>
        </div>
      </Link>
      <div className="ml-10 flex justify-between items-center">
        <div>
          <p>{comment}</p>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-sm font-bold whitespace-nowrap">{duration}</p>
          <div className="flex items-center gap-2">
            <Button onClick={Liked} className="move-button">
              {commentLiked || like ? (
                <div>
                  <FaThumbsUp className="text-purple cursor-pointer peer" />
                  <p
                    className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-3
                 left-3 hidden peer peer-hover:block text-black"
                  >
                    Liked
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <FaRegThumbsUp className="text-purple cursor-pointer peer" />
                  <p
                    className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-3
                 left-3 hidden peer peer-hover:block text-black"
                  >
                    Like
                  </p>
                </div>
              )}
            </Button>
            {commentLikes?.length > 0 && (
              <p
                className="text-purple cursor-pointer whitespace-nowrap"
                onClick={() => setOpenLikeModal(true)}
              >
                {commentLikes.length}{' '}
                {commentLikes.length > 1 ? 'Likes' : 'Like'}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button
                className="peer relative"
                onClick={() => setResponding((prev) => !prev)}
              >
                <FaComment className="text-lightPink" />
              </Button>
              <p
                className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-5
                 left-3 hidden peer peer-hover:block text-black"
              >
                Reply
              </p>
            </div>
            {replies?.length > 0 && (
              <p
                className="text-lightPink cursor-pointer whitespace-nowrap"
                onClick={() => setShowReplies((prev) => !prev)}
              >
                {' '}
                {replies?.length} {replies?.length > 1 ? 'replies' : 'reply'}
              </p>
            )}
          </div>
        </div>
        <LikeModal
          isOpen={openLikeModal}
          onRequestClose={() => setOpenLikeModal(false)}
          likes={commentLikes}
        />
      </div>
      {responding && <CommentResponseForm commentId={commentId} />}
      {showReplies && (
        <div>
          {replies.map((reply) => (
            <div key={reply.id}>
              <Comment
                profileImage={reply.author.image}
                username={reply.author.username}
                comment={reply.content}
                createdAt={reply.createdAt}
                commentLiked={reply.likes?.some(
                  (like) => like.user.id === user?.id
                )}
                commentLikes={reply.likes}
                commentId={reply.id}
                replies={reply.replies}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
