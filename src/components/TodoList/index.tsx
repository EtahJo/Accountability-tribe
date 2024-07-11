'use client';
import SectionHeader from '@/components/SectionHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FaPlusCircle, FaArrowRight } from 'react-icons/fa';
import Todo from '@/components/TodoList/Todo';
import { Task } from '@prisma/client';
import Link from 'next/link';

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
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full my-5"
      >
        <CarouselContent className="w-full">
          {tasks?.map((task) => (
            <CarouselItem key={task.id} className="lg:basis-1/3 md:basis-1/2">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto ">
        <Link href={`/user/${pageUsername}/tasklist?page=1&filter=all`}>
          View All Sessions
        </Link>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default TodoList;
