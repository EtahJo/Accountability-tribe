'use client';
import { useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { mutate } from 'swr';
import { delete_post } from '@/action/post/delete-post';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Tribe, TribeVisit } from '@prisma/client';
import { toast } from 'sonner';
import EllipsisDropdown from '@/components/EllipsisDropdown/index';
import ProfileImage from '@/components/ProfileImage/index';
import PostEditModal from '@/components/Forms/PostEditModalForm';

interface PostHeaderSectionProps {
  username: string;
  profileImage: string;
  duration: string;
  isAdmin: boolean;
  edited: boolean;
  postAuthorId: string;
  postId: string;
  postTitle: string;
  postContent: string;
  tribe?: Tribe & { tribeVisit: TribeVisit[] };
}

const PostHeaderSection = ({
  username,
  profileImage,
  duration,
  isAdmin,
  edited,
  postAuthorId,
  postId,
  postTitle,
  postContent,
  tribe,
}: PostHeaderSectionProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const pathname = usePathname();
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
  return (
    <div className="flex justify-between">
      <div className="flex items-start gap-x-2">
        <div className="flex flex-col gap-y-2">
          <Link
            className="flex items-center gap-2 cursor-pointer"
            href={`/user/${username}`}
          >
            <ProfileImage image={profileImage} alt="Author profile image" />
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

export default PostHeaderSection;
