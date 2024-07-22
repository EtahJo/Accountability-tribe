'use client';
import { useState, useTransition, useEffect } from 'react';
import * as z from 'zod';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  FaUser,
  FaThumbsUp,
  FaRegThumbsUp,
  FaComment,
  FaPaperPlane,
} from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { getDuration } from '@/util/DateTime';
import { mutate } from 'swr';
import { CreateCommentSchema } from '@/schemas/index';
import { Button } from '@/components/ui/button';
import { create_comment_like } from '@/action/like/create-like';
import { edit_comment } from '@/action/comment /edit-comment';
import { delete_comment } from '@/action/comment /delete-comment';
import { delete_comment_like } from '@/action/like/delete-like';
import LikeModal from '@/components/Posts/LikeModal';
import CommentResponseForm from '../Forms/CommentResponseForm';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import EllipsisDropdown from '@/components/EllipsisDropdown/index';
import Formsy from 'formsy-react';
import CustomInput from '@/components/CustomInput/customInput';

interface CommentProps {
  profileImage: string;
  authorUsername: string;
  authorId: string;
  comment: string;
  isAdmin: boolean;
  commentLiked: boolean;
  edited: boolean;
  commentLikes: { user: { username: string; image: string } }[];
  createdAt: string;
  commentId: string;
  replies: {
    author: { username: string; image: string };
    content: string;
    id: string;
    edited: boolean;
    authorId: string;
    createdAt: string;
    likes: { user: { username: string; image: string; id: string } }[];
    parentId: string;
    replies: {
      author: { username: string; image: string };
      content: string;
      id: string;
      authorId: string;
      createdAt: string;
      likes: { user: { username: string; image: string; id: string } }[];
      parentId: string;
    }[];
  }[];
}
const Comment = ({
  profileImage,
  authorUsername,
  authorId,
  comment,
  commentLiked,
  createdAt,
  commentId,
  commentLikes,
  replies,
  isAdmin,
  edited,
}: CommentProps) => {
  const [like, setLike] = useState(commentLiked);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [responding, setResponding] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const activeHash = window?.location.hash;
    const activeId = activeHash.split('#')[1];
    setActiveId(activeId);
  }, []);

  const { user }: any = useCurrentUser();
  const Liked = () => {
    if (!commentLiked) {
      setLike(true);
      create_comment_like(commentId).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
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
  const deleteCommentLike = () => {
    setLike(false);
    delete_comment_like(commentId).then((data) => {
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
  const deleteComment = () => {
    startTransition(() => {
      delete_comment(commentId).then((data) => {
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
    });
  };
  const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
    startTransition(() => {
      edit_comment(vals, commentId).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data.success) {
          setEditComment(false);
          mutate(
            `https://accountability-tribe.vercel.app/user/api/posts/${data.postAuthorUsername}/${user?.id}`
          );
          mutate(
            `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/${user.id}`
          );
        }
      });
    });
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
    <div
      className={cn(
        'flex flex-col gap-y-1 border-b-2 border-b-gray-200 m-2 pb-2 relative',
        activeId === commentId
          ? 'bg-lighterPink p-2 rounded-md mb-4'
          : 'bg-transparent'
      )}
      id={commentId}
    >
      <div className="flex justify-between items-center">
        <Link
          href={`/user/${authorUsername}`}
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
            <p className="font-semibold">{authorUsername}</p>
          </div>
        </Link>
        <EllipsisDropdown
          authorId={authorId}
          isAdmin={isAdmin}
          deleteAction={deleteComment}
          showEditFunction={() => setEditComment(true)}
          isPending={isPending}
        />
      </div>

      <div className="ml-10 flex justify-between items-center">
        <div className="basis-3/4">
          {editComment ? (
            <Formsy
              className="flex items-center gap-x-2 w-full"
              onValidSubmit={onValidSubmit}
            >
              <CustomInput
                name="content"
                value={comment}
                disabled={isPending}
                placeholder="React to post (Be Positive)"
                Icon={
                  <Button type="submit" disabled={isPending}>
                    <FaPaperPlane />
                  </Button>
                }
                inputClassNames={'p-2 w-[300px]'}
              />
              <p
                className="cursor-pointer text-sm font-bold"
                onClick={() => setEditComment(false)}
              >
                X
              </p>
            </Formsy>
          ) : (
            <div>
              <p>{comment}</p>
              {edited && <p className=" text-sm  opacity-30">Edited</p>}
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-sm font-bold whitespace-nowrap">{duration}</p>
          <div className="flex items-center gap-2">
            <Button
              onClick={commentLiked ? deleteCommentLike : Liked}
              className="move-button"
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
      <CommentResponseForm
        commentId={commentId}
        responding={responding}
        setResponding={setResponding}
      />
      {showReplies && (
        <div>
          {replies.map((reply) => (
            <div key={reply.id}>
              <Comment
                profileImage={reply.author.image}
                authorId={reply.authorId}
                authorUsername={reply.author.username}
                comment={reply.content}
                createdAt={reply.createdAt}
                commentLiked={reply.likes?.some(
                  (like) => like.user.id === user?.id
                )}
                commentLikes={reply.likes}
                commentId={reply.id}
                replies={reply.replies as any}
                edited={reply.edited}
                isAdmin={isAdmin}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
