import SectionHeader from '@/components/SectionHeader';
import Achievement from '@/components/Achievements/Achievement';
interface AchievementsProps {
  completedTasks: {}[];
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
            dateCompleted={task.dateCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
