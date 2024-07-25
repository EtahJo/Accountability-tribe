'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Task, SessionParticipant } from '@prisma/client';
import TaskSkeleton from '@/components/Skeletons/TaskSkeleton';
import Todo from '@/components/TodoList/Todo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import useSWR from 'swr';

type SelectedTaskProps = Pick<
  Task,
  'dueDate' | 'title' | 'description' | 'status' | 'id' | 'userId' | 'priority'
> & { sessionParticipants: SessionParticipant[] };
interface TaskCarouselProps {
  // highPriorityTasks: SelectedTaskProps[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const RecommendedTasksCarousel = () => {
  const { user }: any = useCurrentUser();
  const { data: highPriorityTasks, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/tasks/${user.username}/high-priority`,
    fetcher
  );
  if (isLoading || highPriorityTasks === undefined) {
    return (
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full "
      >
        <CarouselContent className="w-full">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem
              className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
              key={index}
            >
              <TaskSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
  if (highPriorityTasks?.length === 0) {
    return (
      <div
        className="bg-white w-full flex justify-center 
      rounded-3xl flex-col items-center p-5 gap-y-2"
      >
        <p className="text-xl ">No High priority task</p>
        <Button className="move-button">
          <Link href="/create-task">Create Task</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="largePhone:mx-4 mx-3">
      <Carousel
        opts={{
          align: 'center',
        }}
        className="w-full "
      >
        <CarouselContent className="w-full">
          {highPriorityTasks?.map(
            ({
              dueDate,
              id,
              title,
              status,
              userId,
              priority,
              description,
              sessionParticipants,
            }: any) => (
              <CarouselItem
                key={id}
                className="min-[1450px]:basis-1/3 basis-2/2 flex-col "
              >
                <Todo
                  title={title}
                  priority={priority}
                  description={description}
                  status={status}
                  id={id}
                  dueDate={dueDate}
                  sessionParticipants={sessionParticipants}
                  taskId={id}
                  userId={userId}
                  pageUsername={user.username}
                />
              </CarouselItem>
            )
          )}
        </CarouselContent>

        <CarouselPrevious className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
        <CarouselNext className="w-5 h-5 bg-lightPink text-white shadow-3xl" />
      </Carousel>
    </div>
  );
};

export default RecommendedTasksCarousel;
