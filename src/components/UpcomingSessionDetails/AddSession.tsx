'use client';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { EditSessionSchema } from '@/schemas';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Formsy from 'formsy-react';
import Custominput from '@/components/CustomInput/customInput';
import { Button } from '@/components/ui/button';
import { mutate } from 'swr';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import SelectTasks from '@/components/CustomMultipleSelectInput/SelectTasks';
import { join_session } from '@/action/session/join-session';

interface AddSessionProps {
  sessionId: string;
  goal: string;
}
const AddSession = ({ sessionId, goal }: AddSessionProps) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState('');
  const [newGoal, setNewGoal] = useState(goal);
  const [error, setError] = useState('');
  const addSession = (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(() => {
      join_session(vals, sessionId, user?.id as string)
        .then((data) => {
          if (data?.error) {
            setSuccess('');
            setError(data.error);
          }
          if (data?.success) {
            setError('');
            setSuccess(data.success);
            mutate(
              `https://accountability-tribe.vercel.app/user/api/sessions/${user.username}/closest-session`
            );
            mutate(
              `https://accountability-tribe.vercel.app/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`
            );
            mutate(
              `https://accountability-tribe.vercel.app/user/api/tasks/${data.creatorUsername}/uncompleted`
            );
          }
        })
        .catch(() => {
          setSuccess('');
          setError('Something went wrong');
        });
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'slg'} className="py-3 move-button" disabled={isPending}>
          Add Session
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[150] min-[417px]:w-[310px] w-[250px] flex justify-center">
        <Formsy
          className="flex flex-col justify-center"
          onValidSubmit={addSession}
        >
          <Custominput
            textArea
            placeholder="Add your own goal"
            name="goal"
            value={newGoal}
            disabled={isPending}
          />
          <SelectTasks
            lable="Add Tasks"
            name="taskIds"
            options={user.tasks as { id: string; title: string }[]}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            className="move-button"
            type="submit"
            disabled={isPending}
            size={'slg'}
          >
            Done
          </Button>
        </Formsy>
      </PopoverContent>
    </Popover>
  );
};

export default AddSession;
