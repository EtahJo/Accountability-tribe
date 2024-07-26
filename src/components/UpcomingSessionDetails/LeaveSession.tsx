'use client';
import { toast } from 'sonner';
import { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { leave_session } from '@/action/session/leave-session';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';

const LeaveSession = ({ sessionId }: { sessionId: string }) => {
  const { user }: any = useCurrentUser();
  const leaveSession = () => {
    leave_session(sessionId).then((data) => {
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
  };
  return (
    <DeleteConfirmation
      trigger={<Button variant={'secondary'}>Leave Session</Button>}
      confirmationMessage="Are you sure you want to leave Session"
      consequenceMessage="This action will prevent any notifications about session detail changes or updates"
      action={
        <Button variant={'destructive'} onClick={leaveSession}>
          Leave Anyway
        </Button>
      }
    />
  );
};

export default LeaveSession;
