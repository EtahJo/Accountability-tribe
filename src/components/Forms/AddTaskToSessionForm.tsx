'use client';
import { useTransition } from 'react';
import Formsy from 'formsy-react';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { toast } from 'sonner';
import { mutate } from 'swr';
import SelectTasks from '@/components/CustomMultipleSelectInput/SelectTasks';
import { link_task_session } from '@/action/task/link-task-to-session';

interface AddTaskToSessionFormProps {
  sessionParticipantId: string;
  tasks?: {}[];
}

const AddTaskToSessionForm = ({
  sessionParticipantId,
  tasks,
}: AddTaskToSessionFormProps) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const taskGoodToAdd = user?.tasks.filter(
    (task: { id: string }) =>
      !tasks?.some((task1: any) => {
        return task.id === task1.taskId;
      })
  );
  const addTaskToSession = async (vals: any) => {
    startTransition(() => {
      vals?.taskIds?.map((task: any) =>
        link_task_session(sessionParticipantId, task.value).then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            mutate(
              `https://accountability-tribe.vercel.app/user/api/tasks/${data.creatorUsername}/high-priority`
            );
            mutate(
              `https://accountability-tribe.vercel.app/user/api/tasks/${data.creatorUsername}/uncompleted`
            );
            mutate(
              `https://accountability-tribe.vercel.app/user/api/sessions/${user.username}/closest-session`
            );
            mutate(
              `https://accountability-tribe.vercel.app/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`
            );
          }
        })
      );
    });
  };
  return (
    <Formsy
      onValidSubmit={addTaskToSession}
      className="flex flex-col justify-center items-center"
    >
      <SelectTasks
        name="taskIds"
        options={taskGoodToAdd as { id: string; title: string }[]}
      />

      <Button type="submit" size={'slg'} className="py-2" disabled={isPending}>
        Add Tasks
      </Button>
    </Formsy>
  );
};

export default AddTaskToSessionForm;
