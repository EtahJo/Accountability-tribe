'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Comment from '@/components/Comment';
import CommentsModal from '@/components/Posts/CommentsModal';
import { FaUser, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { create_post_like } from '@/action/like/create-like';
import Link from 'next/link';
import LikeModal from '@/components/Posts/LikeModal';
import CommentForm from '../Forms/CommentForm';
import { getDuration } from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Tribe, TribeVisit, Post } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import PostDropDown from '@/components/Posts/PostDropdown';

interface PostProps {
  postId: string;
  profileImage: string;
  username: string;
  isAdmin: boolean;
  postContent: string;
  postTitle: string;
  hasLiked: boolean;
  edited: boolean;
  postAuthorId: string;
  tribe?: Tribe & { tribeVisit: TribeVisit[] };
  likes: { user: { username: string; image: string; id: string } }[];
  comments: {
    author: { username: string; image: string };
    content: string;
    edited: boolean;
    id: string;
    createdAt: string;
    likes: { user: { username: string; image: string; id: string } }[];
    parentId: string;
    replies: {
      author: { username: string; image: string };
      content: string;
      id: string;
      edited: boolean;
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
  }[];
  createdAt: string;
  newPosts: Post[];
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
  tribe,
  postTitle,
  postAuthorId,
  newPosts,
  edited,
}: // createdAt,
PostProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [like, setLike] = useState(false);
  const pathname = usePathname();
  const { user } = useCurrentUser();
  const firstFiveComments = comments.slice(0, 5);
  const Liked = () => {
    if (!hasLiked) {
      setLike(true);
      create_post_like(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    }
  };
  const showNewPostConditionOne =
    tribe?.tribeVisit?.length === 1 &&
    new Date(createdAt) > new Date(tribe?.tribeVisit[0]?.lastVisit);
  const showNewPostConditionTwo =
    newPosts?.some((post) => post.id == postId) &&
    pathname.startsWith('/tribe');

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
    <div className="bg-white rounded-2xl p-5  my-5 relative" id={postId}>
      <div className="flex justify-between">
        <div className="flex items-start gap-x-2">
          <div className="flex flex-col gap-y-2">
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
            {edited && <p className=" text-sm  opacity-30 ml-12">Edited</p>}
          </div>

          {isAdmin && <p className="text-sm text-lightPink mt-2">Admin</p>}
        </div>
        <div className="flex flex-col items-end justify-end">
          <PostDropDown
            postContent={postContent}
            postId={postId}
            postTitle={postTitle}
            postAuthorId={postAuthorId}
            isAdmin={isAdmin}
          />
          {!pathname.startsWith('/tribe') && tribe && (
            <span className="flex items-center gap-2">
              <p>Posted In :</p>
              <Link href={`/tribe/${tribe.id}`}>
                <Button
                  variant={'link'}
                  className="font-bold text-lightPink mx-0 px-0"
                >
                  {tribe.name}
                </Button>
              </Link>
            </span>
          )}
        </div>
      </div>
      {showNewPostConditionOne ? (
        <Badge className="absolute top-0 right-0 bg-purple rounded-2xl">
          New Post
        </Badge>
      ) : (
        showNewPostConditionTwo && (
          <Badge className="absolute top-0 right-0 bg-purple rounded-2xl">
            New to Tribe
          </Badge>
        )
      )}

      <div className="w-full bg-lighterPink rounded-2xl p-5 mt-6 mb-4">
        {postTitle && (
          <h2
            className="font-bold text-xl
            bg-purple p-2 w-max text-white rounded-sm"
          >
            {postTitle}
          </h2>
        )}

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
          {firstFiveComments.map(
            (comment) =>
              !comment.parentId && (
                <Comment
                  key={comment.id}
                  profileImage={comment.author.image}
                  authorUsername={comment.author.username}
                  comment={comment.content}
                  createdAt={comment.createdAt}
                  commentLiked={comment.likes?.some(
                    (like) => like.user.id === user?.id
                  )}
                  commentLikes={comment.likes}
                  commentId={comment.id}
                  replies={comment.replies}
                  edited={comment.edited}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
