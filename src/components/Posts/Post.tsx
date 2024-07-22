'use client';
import { useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Comment from '@/components/Comment/index';
import CommentsModal from '@/components/Posts/CommentsModal';
import { FaUser, FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { create_post_like } from '@/action/like/create-like';
import { delete_post } from '@/action/post/delete-post';
import Link from 'next/link';
import LikeModal from '@/components/Posts/LikeModal';
import CommentForm from '../Forms/CommentForm';
import { getDuration } from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { Tribe, TribeVisit, Post } from '@prisma/client';
import { delete_post_like } from '@/action/like/delete-like';
import { Badge } from '@/components/ui/badge';
import PostEditModal from '@/components/Forms/PostEditModalForm';
import EllipsisDropdown from '@/components/EllipsisDropdown/index';

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
    authorId: string;
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
  newPosts?: Post[];
  postEditTitle?: string;
  postEditContent?: string;
}
const PostSnippet = ({
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
  postEditTitle,
  postEditContent,
}: PostProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [like, setLike] = useState(hasLiked);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { user }: any = useCurrentUser();
  const firstFiveComments = comments.slice(0, 5);
  const Liked = () => {
    if (!hasLiked) {
      setLike(true);
      create_post_like(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          mutate(
            `https://accountability-tribe.vercel.app/user/api/posts/${data.postAuthorUsername}/${user?.id}`
          );
          mutate(
            `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/${user.id}`
          );
          mutate(
            `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postAuthorUsername}/post-edits`
          );
          mutate(
            `https://accountability-tribe.vercel.app/user/api/tribes/${user.username}/user-is-tribe-admin/${data.postTribeId}`
          );
        }
      });
    }
  };
  const deletePostLike = () => {
    setLike(false);
    delete_post_like(postId).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        mutate(
          `https://accountability-tribe.vercel.app/user/api/posts/${data.postAuthorUsername}/${user?.id}`
        );
        mutate(
          `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/${user.id}`
        );
      }
    });
  };
  const deletePost = () => {
    startTransition(() => {
      delete_post(postId).then((data) => {
        if (data.success) {
          toast.success(data.success);
          mutate(
            `https://accountability-tribe.vercel.app/user/api/posts/${data.postAuthorUsername}/${user?.id}`
          );
          mutate(
            `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/${user.id}`
          );
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
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
          <EllipsisDropdown
            authorId={postAuthorId}
            isAdmin={isAdmin}
            deleteAction={deletePost}
            isPending={isPending}
            showEditFunction={() => setShowEdit(true)}
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
          <span>
            {postEditTitle ? (
              postEditTitle === postTitle ? (
                <span className="flex items-center">
                  <h2
                    className="font-bold text-xl
            bg-purple p-2 w-max text-white rounded-sm"
                  >
                    {postTitle}
                  </h2>
                  <p className="italic ">{'(No Changes made)'}</p>
                </span>
              ) : (
                <div>
                  <span className="flex items-center gap-2">
                    <h2
                      className="font-bold text-xl
            bg-purple p-2 w-max text-white rounded-sm"
                    >
                      {postTitle}
                    </h2>
                    <Badge className="">Original content</Badge>
                  </span>
                  <span className="flex items-center gap-2">
                    <h2
                      className="font-bold text-xl
            bg-purple p-2 w-max text-white rounded-sm"
                    >
                      {postEditTitle}
                    </h2>
                    <Badge className="">Edited Content</Badge>
                  </span>
                </div>
              )
            ) : (
              <h2
                className="font-bold text-xl
            bg-purple p-2 w-max text-white rounded-sm"
              >
                {postTitle}
              </h2>
            )}
          </span>
        )}
        {postEditContent ? (
          postEditContent === postContent ? (
            <span className="flex items-center">
              <p>{postContent}</p>
              <p className="italic">{'(No Changes made)'}</p>
            </span>
          ) : (
            <div>
              <span className="flex items-center gap-2">
                <p>{postContent}</p>
                <Badge className="">Original content</Badge>
              </span>
              <span className="flex items-center gap-2">
                <p className="">{postEditContent}</p>
                <Badge className="">Edited Content</Badge>
              </span>
            </div>
          )
        ) : (
          <p>{postContent}</p>
        )}
      </div>
      <div className="flex justify-between items-center mx-2">
        <div className="ml-5 flex items-center gap-x-2">
          <Button
            className="move-button"
            size={'icon'}
            onClick={hasLiked ? deletePostLike : Liked}
          >
            {like ? (
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
        comments={comments as any}
        isAdmin={isAdmin}
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
                  replies={comment.replies as any}
                  edited={comment.edited}
                  authorId={comment.authorId}
                  isAdmin={isAdmin}
                />
              )
          )}
        </div>
      )}
      <PostEditModal
        isOpen={showEdit}
        onRequestClose={() => setShowEdit(false)}
        postContent={postContent}
        postTitle={postTitle}
        postId={postId}
      />
    </div>
  );
};

export default PostSnippet;
