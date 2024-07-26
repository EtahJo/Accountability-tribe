'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mutate } from 'swr';
import { create_post_like } from '@/action/like/create-like';
import { delete_post_like } from '@/action/like/delete-like';
import { toast } from 'sonner';
import { User } from '@prisma/client';
import { useCurrentUser } from '@/hooks/use-current-user';
import LikeModal from '@/components/Posts/LikeModal';

import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

interface PostLikeSectionProps {
  likes: { user: Pick<User, 'username' | 'image' | 'id'> }[];
  hasLiked: boolean;
  postId: string;
}

const PostLikeSection = ({ likes, hasLiked, postId }: PostLikeSectionProps) => {
  const [like, setLike] = useState(hasLiked);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const { user }: any = useCurrentUser();
  const LikePost = () => {
    if (!hasLiked) {
      setLike(true);
      create_post_like(postId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postTribeId}/${user.id}`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postAuthorUsername}/post-edits`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.postTribeId}`
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
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`
        );
        mutate(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postTribeId}/${user.id}`
        );
        mutate(
          `${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postAuthorUsername}/post-edits`
        );
        mutate(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.postTribeId}`
        );
      }
    });
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        className="move-button"
        size={'icon'}
        onClick={hasLiked ? deletePostLike : LikePost}
      >
        {like ? (
          <div>
            <FaThumbsUp className="text-purple cursor-pointer peer" size={15} />
            <p
              className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-3
         left-3 hidden peer peer-hover:block text-black"
            >
              Liked
            </p>
          </div>
        ) : (
          <div className="relative">
            <FaRegThumbsUp
              className="text-purple cursor-pointer peer"
              size={15}
            />
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
          className="text-purple cursor-pointer hover:underline text-xs"
          onClick={() => setOpenLikeModal(true)}
        >
          {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
        </p>
      )}
      <LikeModal
        isOpen={openLikeModal}
        onRequestClose={() => setOpenLikeModal(false)}
        likes={likes as any}
      />
    </div>
  );
};

export default PostLikeSection;
