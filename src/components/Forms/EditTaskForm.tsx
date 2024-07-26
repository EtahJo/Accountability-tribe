'use client';
import { useState, useTransition } from 'react';
import Formsy from 'formsy-react';
import * as z from 'zod';
import CustomInput from '@/components/CustomInput/customInput';
import { EditTaskSchema } from '@/schemas/index';
import { edit_task } from '@/action/task/edit-task';
import DateOnlyInput from '@/components/CustomDateInput/DateOnlyInput';
import FormsySelectInput from '@/components/CustomSelectInput/FormsySelectInput';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/Messages/Error';
import { mutate } from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormSuccess } from '@/components/Messages/Success';
import { Status } from '@prisma/client';

export interface EditTaskFormProps {
  presentTask: {
    title: string;
    description: string;
    dueDate: Date;
    priority: number | string;
    id: string;
    status: string;
  };
}

const EditTaskForm = ({ presentTask }: EditTaskFormProps) => {
  const { user }: any = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [title, setTitle] = useState(presentTask.title || '');
  const [description, setDescription] = useState(presentTask.description || '');
  const [dueDate, setDueDate] = useState(presentTask.dueDate || new Date());
  const [status, setStatus] = useState(presentTask.status.toString() || '');
  const [priority, setPriority] = useState(
    presentTask.priority.toString() || 0
  );

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
  const statusItems = [
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
  const onValidSubmit = (vals: z.infer<typeof EditTaskSchema>) => {
    vals.priority = vals.priority
      ? parseInt(vals.priority.toString())
      : undefined;
    startTransition(() => {
      edit_task(vals, presentTask.id).then((data) => {
        if (data.error) {
          setSuccess('');
          setError(data.error);
        }
        if (data.success) {
          setError('');
          setSuccess(data.success);
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
          mutate(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/completed-task`
          );
        }
      });
    });
  };
  return (
    <Formsy
      className="bg-white shadow-3xl rounded-2xl p-10 w-1/2 mt-5"
      onValidSubmit={onValidSubmit}
    >
      <div className="my-5 border-2 border-lightPink rounded-3xl p-3">
        <CustomInput
          name="title"
          value={title}
          placeholder="Finish Chapter"
          lable="Task Title"
          required
          disabled={isPending}
        />
        <CustomInput
          textArea
          name="description"
          placeholder="I will be completing..."
          value={description}
          lable="Task Description"
          disabled={isPending}
        />
        <FormsySelectInput
          placeholder="Select Priority Level"
          lable="Task Priority"
          items={items}
          value={priority}
          name="priority"
          onValueChange={(value: any) => {
            setPriority(value);
          }}
          disabled={isPending}
        />
        <FormsySelectInput
          placeholder="Select Task Status"
          lable="Task Status"
          items={statusItems}
          value={status}
          name="status"
          onValueChange={(value: any) => {
            setStatus(value);
          }}
          disabled={isPending}
        />
        <DateOnlyInput
          name="dueDate"
          value={dueDate}
          lable="Task Due Date"
          date={dueDate}
          setDate={(date: any) => {
            setDueDate(date);
          }}
          disabled={isPending}
        />
      </div>
      {error && <FormError message={error} />}
      {success && <FormSuccess message={success} />}
      <div className="flex flex-col gap-2 mt-3">
        <Button size={'slg'} className="move-button py-2" type="submit">
          Edit Task
        </Button>
      </div>
    </Formsy>
  );
};

export default EditTaskForm;
