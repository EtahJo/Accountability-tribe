'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { approve_post, post_edit_approval } from '@/action/post/post-approval';
import { delete_post } from '@/action/post/delete-post';
import { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'sonner';

const ApproveDecline = ({
  postId,
  postEditId,
}: {
  postId?: string;
  postEditId?: string;
}) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const approvePostEdit = () => {
    startTransition(() => {
      post_edit_approval(postEditId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          mutate(
            `https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/post-edits`
          );
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
  const approvePost = () => {
    startTransition(() => {
      approve_post(postId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          mutate(
            `https://accountability-tribe.vercel.app/user/api/tribes/${user.username}/user-is-tribe-admin/${data.postTribeId}`
          );
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
  const deletePost = () => {
    startTransition(() => {
      delete_post(postId as string).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="move-button"
        onClick={postId ? approvePost : approvePostEdit}
        disabled={isPending}
      >
        Approve
      </Button>
      <Button
        variant={'destructive'}
        className="move-button"
        onClick={deletePost}
        disabled={isPending}
      >
        Delete
      </Button>
    </div>
  );
};

export default ApproveDecline;
