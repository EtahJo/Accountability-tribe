'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SessionModal from '@/components/TodoList/SessionModal';
import { Task } from '@prisma/client';
import TodoHeader from '@/components/TodoList/TodoHeader';
import DeleteTodo from './DeleteTodo';
import TodoDetails from '@/components/TodoList/TodoDetails';
import EditTask from '@/components/GoTo/EditTask';

interface TodoProps {
  taskId: string;
  sessionParticipants: {}[];
  pageUsername: string;
}
const Todo = ({
  title,
  priority,
  description,
  status,
  pageUsername,
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
  const { user }: any = useCurrentUser();

  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        'bg-white rounded-2xl my-2 largePhone:w-[320px] shadow-3xl  p-2 min-[348px]:w-[200px] w-[170px]'
      )}
    >
      <AccordionItem value={taskId} className="border-b-0">
        <AccordionTrigger className="hover:no-underline">
          <TodoHeader
            taskId={taskId}
            userId={userId}
            status={status}
            title={title}
            priority={priority}
          />
        </AccordionTrigger>

        <AccordionContent>
          <TodoDetails
            description={description}
            dueDate={dueDate}
            sessionParticipants={sessionParticipants}
            setIsOpenModal={setIsOpenModal}
          />
          {user?.id === userId && (
            <div>
              <EditTask taskId={taskId} />
              <DeleteTodo taskId={taskId} />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      <SessionModal
        sessionParticipants={sessionParticipants}
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        taskId={taskId}
        pageUsername={pageUsername}
      />
    </Accordion>
  );
};

export default Todo;
