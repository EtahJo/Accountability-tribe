'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Task, SessionParticipant } from '@prisma/client';
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
  const { data: highPriorityTasks } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/tasks/${user.username}/high-priority`,
    fetcher
  );
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
    <div className="mx-4">
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
              <CarouselItem key={id} className="lg:basis-1/3 md:basis-1/2">
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
                />
              </CarouselItem>
            )
          )}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecommendedTasksCarousel;
