import SectionHeader from '@/components/SectionHeader';
import Achievement from '@/components/Achievements/Achievement';
import { Task } from '@prisma/client';
interface AchievementsProps {
  completedTasks: Task[];
}

const Achievements = ({ completedTasks }: AchievementsProps) => {
  return (
    <div className="mb-4">
      <SectionHeader name="Achievements" />
      <div>
        {completedTasks?.map((task) => (
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
