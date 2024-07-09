'use client';
import { useTransition } from 'react';
import Formsy from 'formsy-react';
import FormsySelectInput from '@/components/CustomSelectInput/FormsySelectInput';
import { Status } from '@prisma/client';
import { edit_task } from '@/action/task/edit-task';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface StatusUpdateProps {
  status: string;
  taskId: string;
  userId: string;
}
const StatusUpdate = ({ status, taskId, userId }: StatusUpdateProps) => {
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const items = [
    {
      title: Status.COMPLETE,
      id: Status.COMPLETE,
    },
    {
      title: Status.STARTED,
      id: Status.STARTED,
    },
    {
      title: 'NOT STARTED',
      id: Status.NOTSTARTED,
    },
    {
      title: Status.PROGRESS,
      id: Status.PROGRESS,
    },
  ];
  return (
    <div>
      {user?.id === userId ? (
        <Popover>
          <PopoverTrigger asChild>
            <p className="rounded-xl border-lightPink border-2 px-2 py-px text-xs hover:bg-lightPink shadow-3xl ">
              {status === 'NOTSTARTED' ? 'NOT STARTED' : status}
            </p>
          </PopoverTrigger>
          <PopoverContent>
            <Formsy>
              <FormsySelectInput
                name="status"
                onValueChange={(value: any) => {
                  startTransition(() => {
                    edit_task({ status: value }, taskId);
                  });
                }}
                items={items}
                placeholder={status === 'NOTSTARTED' ? 'NOT STARTED' : status}
                disabled={isPending}
              />
            </Formsy>
          </PopoverContent>
        </Popover>
      ) : (
        <p className="rounded-xl border-lightPink border-2 px-2 py-px text-xs hover:bg-lightPink shadow-3xl ">
          {status === 'NOTSTARTED' ? 'NOT STARTED' : status}
        </p>
      )}
    </div>
  );
};

export default StatusUpdate;
