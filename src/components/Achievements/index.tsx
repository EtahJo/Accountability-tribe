'use client';
import useSWR from 'swr';
import SectionHeader from '@/components/SectionHeader/index';
import Achievement from '@/components/Achievements/Achievement';
import TaskSkeleton from '../Skeletons/TaskSkeleton';
import { Task } from '@prisma/client';
interface AchievementsProps {
  // completedTasks: Task[];
  pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Achievements = ({ pageUsername }: AchievementsProps) => {
  const { data: completedTasks, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/tasks/${pageUsername}/completed-task`,
    fetcher
  );
  if (isLoading || completedTasks === undefined) {
    return (
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="mb-4">
      <SectionHeader name="Achievements" />
      <div>
        {completedTasks?.map((task: any) => (
          <Achievement
            key={task.id}
            taskTitle={task.title}
            dateCompleted={task.dateCompleted as any}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
