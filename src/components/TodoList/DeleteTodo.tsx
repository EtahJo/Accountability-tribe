'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { delete_task } from '@/action/task/delete-task';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';

const DeleteTodo = ({ taskId }: { taskId: string }) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const deleteTask = () => {
    startTransition(() => {
      delete_task(taskId).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/high-priority`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`
          );
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`
          );
        }
      });
    });
  };
  return (
    <DeleteConfirmation
      trigger={
        <Button
          className="py-2 mt-2"
          size={'slg'}
          variant="destructive"
          disabled={isPending}
        >
          Delete Task
        </Button>
      }
      confirmationMessage="Are you sure you want to delete task?"
      consequenceMessage="This action is not reversible"
      action={<Button onClick={deleteTask}>Delete</Button>}
    />
  );
};

export default DeleteTodo;
