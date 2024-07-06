'use client';
import { useTransition } from 'react';
import Formsy from 'formsy-react';
import FormsySelectInput from '@/components/CustomSelectInput/FormsySelectInput';
import { edit_task } from '@/action/edit-task';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PriorityUpdateProps {
  priority: number;
  taskId: string;
}
const PriorityUpdate = ({ priority, taskId }: PriorityUpdateProps) => {
  const [isPending, startTransition] = useTransition();
  const items = [
    {
      title: 'First Priority',
      id: '1',
    },
    {
      title: 'High Priority',
      id: '2',
    },
    {
      title: 'Low Priority',
      id: '3',
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p
          className={cn(
            'text-white bg-purple rounded-xl px-2 py-px text-xs whitespace-nowrap cursor-pointer',
            priority === 2 && 'bg-green-600',
            priority === 3 && 'bg-gray-500',
            priority === 1 && 'bg-purple'
          )}
        >
          {priority === 1 && 'FIRST PRIORITY'}
          {priority === 2 && 'HIGH PRIORITY'}
          {priority === 3 && 'LOW PRIORITY'}
        </p>
      </PopoverTrigger>
      <PopoverContent>
        <Formsy>
          <FormsySelectInput
            name="priority"
            items={items}
            placeholder={
              priority === 1
                ? 'FIRST PRIORITY'
                : priority === 2
                ? 'HIGH PRIORITY'
                : 'LOW PRIORITY'
            }
            onValueChange={(value: any) => {
              startTransition(() => {
                edit_task({ priority: parseInt(value) }, taskId);
              });
            }}
            disabled={isPending}
          />
        </Formsy>
      </PopoverContent>
    </Popover>
  );
};

export default PriorityUpdate;
