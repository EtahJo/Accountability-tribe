import SectionHeader from '@/components/SectionHeader';
import Achievement from '@/components/Achievements/Achievement';
interface AchievementsProps {
  tasks: {}[];
}

const Achievements = ({ tasks }: AchievementsProps) => {
  return (
    <div className="mb-4">
      <SectionHeader name="Achievements" />
      <div>
        {tasks.map(
          (task) =>
            task.status === 'COMPLETE' && (
              <Achievement
                key={task.id}
                taskTitle={task.title}
                dateCompleted={task.dateCompleted}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Achievements;
