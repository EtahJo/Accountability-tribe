'use client';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Button } from '@/components/ui/button';
import Formsy from 'formsy-react';
import { mutate } from 'swr';
import { EditSessionSchema } from '@/schemas';
import { FormError } from '@/components/Messages/Error';
import { duplicate_session } from '@/action/session/duplicate-session';
import { FormSuccess } from '@/components/Messages/Success';
import Custominput from '@/components/CustomInput/customInput';
import SelectTasks from '@/components/CustomMultipleSelectInput/SelectTasks';

interface DuplicateSessionProps {
  goal: string;
  pageUser: { tasks: {} };
  sessionId: string;
}

const DuplicateSession = ({
  goal,
  pageUser,
  sessionId,
}: DuplicateSessionProps) => {
  const [isPending, startTransition] = useTransition();
  const [newMeetingLink, setNewMeetingLink] = useState('');

  const [newGoal, setNewGoal] = useState(goal);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user }: any = useCurrentUser();
  const duplicateSession = async (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(() => {
      duplicate_session(vals, sessionId)
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
        <Button className="move-button py-3 bg-lightPink" size={'slg'}>
          Duplicate Session For Tomorrow
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[150] w-[310px]">
        <Formsy
          className="flex flex-col justify-center"
          onValidSubmit={duplicateSession}
        >
          <Custominput
            textArea
            placeholder="Add your new goal"
            name="goal"
            value={newGoal}
            disabled={isPending}
          />
          <SelectTasks
            name="taskIds"
            options={pageUser?.tasks as { id: string; title: string }[]}
          />
          <Custominput
            placeholder="Add new meeting link"
            required
            name="meetingLink"
            value={newMeetingLink}
            disabled={isPending}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button className="move-button" type="submit" disabled={isPending}>
            Done
          </Button>
        </Formsy>
      </PopoverContent>
    </Popover>
  );
};

export default DuplicateSession;
