'use client';
import { useTransition } from 'react';
import { delete_session } from '@/action/session/delete-session';
import { mutate } from 'swr';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';

const DeleteSession = ({ sessionId }: { sessionId: string }) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const deleteSession = () => {
    startTransition(() => {
      delete_session(sessionId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted`
          );
        }
      });
    });
  };

  return (
    <DeleteConfirmation
      trigger={
        <Button variant={'destructive'} disabled={isPending}>
          Delete Session
        </Button>
      }
      confirmationMessage="Are you sure you want to delete Session"
      consequenceMessage="This action will prevent any notifications about session detail changes or updates"
      action={
        <Button variant={'destructive'} onClick={deleteSession}>
          Delete Anyway
        </Button>
      }
    />
  );
};

export default DeleteSession;
