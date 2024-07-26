'use client';
import { useTransition } from 'react';
import { mutate } from 'swr';
import { toast } from 'sonner';
import { useCurrentUser } from '@/hooks/use-current-user';
import { remove_task_from_session } from '@/action/task/remove-task-from-session';
import Todo from '@/components/TodoList/Todo';
import ToolTip from '@/components/ToolTip/index';
import { cn } from '@/lib/utils';
import AddTaskToSessionForm from '@/components/Forms/AddTaskToSessionForm';
import DeleteConfirmation from '../Confirmations/DeleteConfirmation';
import { Button } from '@/components/ui/button';

interface SessionTasksProps {
  tasks?: {}[];
  sessionParticipantId: string;
  isMember?: boolean;
  isAfter: boolean;
  pageUsername: string;
}
const SessionTasks = ({
  tasks,
  sessionParticipantId,
  isMember,
  isAfter,
  pageUsername,
}: SessionTasksProps) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const removeTaskFromSession = (taskId: string) => {
    startTransition(() => {
      remove_task_from_session(taskId, sessionParticipantId).then((data) => {
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
    <div className="flex flex-col justify-center items-center relative">
      {tasks?.map(({ task }: any) => (
        <div className="flex items-center relative" key={task.id}>
          <Todo
            title={task.title}
            priority={task.priority}
            description={task.description}
            status={task.status}
            id={task.id}
            dueDate={task.dueDate}
            sessionParticipants={task.sessionParticipants}
            taskId={task.id}
            userId={task.userId}
            pageUsername={pageUsername}
          />
          <div className="absolute top-0 right-0 m-3">
            <DeleteConfirmation
              trigger={
                <ToolTip
                  trigger={
                    <Button
                      className={cn(
                        'font-bold hover:text-purple cursor-pointer -ml-2',
                        isPending ? 'opacity-50' : 'opacity-100'
                      )}
                      size={'sm'}
                      variant={'ghost'}
                    >
                      X
                    </Button>
                  }
                >
                  <p>Remove task from session</p>
                </ToolTip>
              }
              confirmationMessage="Are you sure you want to remove task from session?"
              action={
                <Button
                  onClick={() => {
                    removeTaskFromSession(task.id);
                  }}
                >
                  Remove
                </Button>
              }
            />
          </div>
        </div>
      ))}
      {isMember && !isAfter && pageUsername === user.username && (
        <AddTaskToSessionForm
          sessionParticipantId={sessionParticipantId}
          tasks={tasks}
        />
      )}
    </div>
  );
};

export default SessionTasks;
