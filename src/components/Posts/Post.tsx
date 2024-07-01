'use client';
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Comment from '@/components/Comment';
import CommentsModal from '@/components/Posts/CommentsModal';
import { FaUser, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { create_post_like } from '@/action/create-like';
import Link from 'next/link';
import LikeModal from '@/components/Posts/LikeModal';
import CommentForm from '../Forms/CommentForm';
import { formatDateTime, getDuration } from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '../ui/button';

interface PostProps {
  postId: string;
  profileImage: string;
  username: string;
  isAdmin: boolean;
  postContent: string;
  hasLiked: boolean;
  likes: { user: { username: string; image: string } }[];
  comments: {
    author: { username: string; image: string };
    content: string;
    id: string;
  }[];
  createdAt: string;
}
const Post = ({
  postId,
  profileImage,
  username,
  isAdmin,
  postContent,
  likes,
  comments,
  hasLiked,
  createdAt,
}: // createdAt,
PostProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [like, setLike] = useState(false);
  const { user } = useCurrentUser();
  const firstFiveComments = comments.slice(0, 5);
  const Liked = () => {
    if (!hasLiked) {
      create_post_like(postId).then((data) => {
        if (data.error) {
        }
        if (data.success) {
          setLike((prev) => !prev);
        }
      });
    }
  };
  const NowDateTime = new Date();
  const theDuration = getDuration(createdAt, NowDateTime.toISOString());
  const duration =
    parseInt(theDuration.minutes) < 60
      ? theDuration.hm.minutes + ' minutes'
      : theDuration.hours < 24
      ? Math.floor(theDuration.hours) + ' h'
      : Math.floor(theDuration.days) + ' days';

  return (
    <div className="bg-white rounded-2xl p-5 shadow-3xl my-5">
      <div className="flex items-start gap-x-3">
        <Link
          className="flex items-center gap-2 cursor-pointer"
          href={`/user/${username}`}
        >
          <Avatar className=" w-[40px] h-[40px] items-center border-2 border-lightPink  shadow-3xl">
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
          <div>
            <p className="font-bold text-xl">{username}</p>

            <p>{duration}</p>
          </div>
        </Link>

        {isAdmin && <p className="text-sm text-lightPink mt-2">Admin</p>}
      </div>

      <div className="w-full bg-lighterPink rounded-2xl p-5 mt-6 mb-4">
        <p>{postContent}</p>
      </div>
      <div className="flex justify-between items-center mx-2">
        <div className="ml-5 flex items-center gap-x-2">
          <Button className="move-button" size={'icon'} onClick={Liked}>
            {hasLiked || like ? (
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

          {likes.length > 0 && (
            <p
              className="text-purple cursor-pointer"
              onClick={() => setOpenLikeModal(true)}
            >
              {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
            </p>
          )}
        </div>

        {comments.length > 0 && (
          <p
            className="text-lightPink cursor-pointer"
            onClick={() => setOpenCommentModal(true)}
          >
            {comments.length} comments
          </p>
        )}
      </div>
      <CommentForm postId={postId} />
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
              key={comment.id}
              profileImage={comment.author.image}
              username={comment.author.username}
              comment={comment.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
