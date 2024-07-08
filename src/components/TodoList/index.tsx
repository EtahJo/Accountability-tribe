'use client';
import SectionHeader from '@/components/SectionHeader';

import { FaPlusCircle } from 'react-icons/fa';
import Todo from '@/components/TodoList/Todo';
import { Task } from '@prisma/client';

const TodoList = ({
  tasks,
  pageUsername,
}: {
  tasks: Array<Task>;
  pageUsername: string;
}) => {
  return (
    <div>
      <SectionHeader
        name="Your Todo List"
        buttonLink="/create-task"
        buttonTitle="Create Task"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
        pageUsername={pageUsername}
      />
      <div className="flex flex-wrap my-5">
        {tasks?.map((task) => (
          <div key={task.id}>
            <Todo
              title={task.title}
              priority={task.priority}
              description={task.description}
              status={task.status}
              // id={task.id}
              dueDate={task.dueDate}
              sessionParticipants={task.sessionParticipants}
              taskId={task.id}
              dateCompleted={task.dateCompleted}
              userId={task.userId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
