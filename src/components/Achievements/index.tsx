'use client';
import useSWR from 'swr';
import SectionHeader from '@/components/SectionHeader/index';
import Achievement from '@/components/Achievements/Achievement';
import { Task } from '@prisma/client';
interface AchievementsProps {
  // completedTasks: Task[];
  pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Achievements = ({ pageUsername }: AchievementsProps) => {
  const { data: completedTasks } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/tasks/${pageUsername}/completed-task`,
    fetcher
  );
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
