import UpcomingSessions from '@/components/UpcomingSessions';
import TodoList from '@/components/TodoList';
import Posts from '@/components/Posts';
import Achievements from '@/components/Achievements';
import Tribes from '@/components/Tribes';
import SelectPeriod from '@/components/SelectPeriod';

interface UserProfileBodyProps {
  user: {} | undefined;
  sessions: [] | undefined;
  tribes: [] | undefined;
  joinTribe: (tribeId: string, userId: string) => {};
}

const UserProfileBody = ({
  user,
  sessions,
  tribes,
  joinTribe,
}: UserProfileBodyProps) => {
  return (
    <div className="grid grid-cols-12 pb-24">
      <div className="col-start-2 col-end-9">
        <SelectPeriod />
        <UpcomingSessions user={user} sessions={sessions} />
        <TodoList />
        <Posts />
      </div>
      <div className="col-start-10 col-end-12">
        <Achievements />
        <Tribes tribes={tribes} joinTribe={joinTribe} />
      </div>
    </div>
  );
};

export default UserProfileBody;
