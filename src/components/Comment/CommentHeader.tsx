'use client';
import { useTransition } from 'react';
import { delete_comment } from '@/action/comment /delete-comment';
import Link from 'next/link';
import { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'sonner';
import EllipsisDropdown from '@/components/EllipsisDropdown';
import ProfileImage from '@/components/ProfileImage';

interface CommentHeaderProps {
  authorUsername: string;
  profileImage: string;
  isAdmin: boolean;
  authorId: string;
  commentId: string;
  showEditFunction: () => void;
}

const CommentHeader = ({
  authorUsername,
  profileImage,
  isAdmin,
  authorId,
  commentId,
  showEditFunction,
}: CommentHeaderProps) => {
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const deleteComment = () => {
    startTransition(() => {
      delete_comment(commentId).then((data) => {
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
    });
  };
  return (
    <div className="flex justify-between items-center">
      <Link
        href={`/user/${authorUsername}`}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <ProfileImage
          image={profileImage}
          alt="Comment author profile image"
          dimensions="largePhone:w-[30px] largePhone:h-[30px] w-[20px] h-[20px]"
        />
        <div className="">
          <p className="font-semibold">{authorUsername}</p>
        </div>
      </Link>
      <EllipsisDropdown
        authorId={authorId}
        isAdmin={isAdmin}
        deleteAction={deleteComment}
        showEditFunction={showEditFunction}
        isPending={isPending}
      />
    </div>
  );
};

export default CommentHeader;
