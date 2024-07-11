'use client';
import { useState, useTransition } from 'react';
import { FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/use-current-user';
import FullTextOnHover from '../FullTextOnHover/index';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/util/DateTime';
import { edit_task } from '@/action/task/edit-task';
import { delete_task } from '@/action/task/delete-task';
import StatusUpdate from '@/components/TodoList/StatusUpdate';
import SessionModal from '@/components/TodoList/SessionModal';
import PriorityUpdate from '@/components/TodoList/PriorityUpdate';
import { Task } from '@prisma/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';
import { toast } from 'sonner';

interface TodoProps {
  taskId: string;
  sessionParticipants: {}[];
}
const Todo = ({
  title,
  priority,
  description,
  status,
  // id,
  dueDate,
  sessionParticipants,
  taskId,
  userId,
}: Pick<
  Task,
  'dueDate' | 'title' | 'description' | 'status' | 'id' | 'userId' | 'priority'
> &
  TodoProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { user }: any = useCurrentUser();
  const deleteTask = () => {
    delete_task(taskId).then((data) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('bg-white rounded-2xl my-2 w-[320px] shadow-3xl mx-2 p-2')}
    >
      <AccordionItem value={taskId} className="border-b-0">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex gap-x-2 items-center">
            {user?.id === userId ? (
              <div
                className="h-6 w-6 bg-transparent border-lightPink border-2 rounded-full flex items-center justify-center cursor-pointer "
                onClick={() => {
                  setCompleted((prev) => !prev);
                  if (status === 'COMPLETE') {
                    edit_task({ status: 'PROGRESS' }, taskId);
                  } else {
                    edit_task({ status: 'COMPLETE' }, taskId);
                  }
                }}
              >
                <FaCheck
                  className={cn(
                    'text-purple m-auto',
                    status === 'COMPLETE' || completed ? 'block' : 'hidden'
                  )}
                />
              </div>
            ) : (
              <div className="ml-3" />
            )}

            <div>
              <p className="font-bold text-base text-start">{title}</p>
              <div className="flex items-center gap-2 ">
                <PriorityUpdate
                  priority={priority}
                  taskId={taskId}
                  userId={userId}
                />
                <StatusUpdate status={status} taskId={taskId} userId={userId} />
              </div>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div
            className={cn(
              'bg-lighterPink mt-3 rounded-2xl p-2 flex items-center justify-between'
            )}
          >
            <div className=" flex flex-col gap-1">
              <FullTextOnHover
                text={description as string}
                textClassName="top-0"
                className="w-52"
              />

              <span className="flex">
                <p>Due: </p>
                <p className="text-purple font-bold">
                  {formatDateTime(dueDate, user?.timezone).date}
                </p>
              </span>
            </div>
            <Badge
              className="whitespace-nowrap w-28 cursor-pointer pr-2"
              onClick={() => {
                if (sessionParticipants.length > 0) {
                  setIsOpenModal(true);
                }
              }}
            >
              In {sessionParticipants?.length} Sessions
            </Badge>
          </div>
          {user?.id === userId && (
            <div>
              <Link
                href={`/edit-task/${taskId}`}
                className="flex justify-center mt-2"
              >
                <Button size={'slg'} className="py-2">
                  Edit
                </Button>
              </Link>
              <DeleteConfirmation
                trigger={
                  <Button
                    className="py-2 mt-2"
                    size={'slg'}
                    variant="destructive"
                  >
                    Delete Task
                  </Button>
                }
                confirmationMessage="Are you sure you want to delete task?"
                consequenceMessage="This action is not reversible"
                action={<Button onClick={deleteTask}>Delete</Button>}
              />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      <SessionModal
        sessionParticipants={sessionParticipants}
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
      />
    </Accordion>
  );
};

export default Todo;
