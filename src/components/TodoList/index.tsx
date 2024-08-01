'use client';
import useSWR from 'swr';
import SectionHeader from '@/components/SectionHeader/index';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { FaPlusCircle, FaArrowRight } from 'react-icons/fa';
import TaskSkeleton from '../Skeletons/TaskSkeleton';
import Todo from '@/components/TodoList/Todo';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TodoList = ({ pageUsername }: { pageUsername: string }) => {
  const { data: tasks, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${pageUsername}/uncompleted?page=1`,
    fetcher
  );
  if (isLoading || tasks === undefined) {
    return (
      <div className="flex items-center gap-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }
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
          {tasks?.tasks.map((task: any) => (
            <CarouselItem
              key={task.id}
              className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
            >
              <Todo
                title={task.title}
                priority={task.priority}
                description={task.description}
                status={task.status}
                id={task.id}
                dueDate={task.dueDate}
                sessionParticipants={task.sessionParticipants}
                taskId={task.id}
                userId={task.userId}
                pageUsername={pageUsername}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="w-5 h-5 bg-purple text-white shadow-3xl" />
        <CarouselNext className="w-5 h-5 bg-purple text-white shadow-3xl" />
      </Carousel>
      <div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto ">
        <Link href={`/user/${pageUsername}/tasks?page=1&filter=all`}>
          View All Tasks
        </Link>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default TodoList;
