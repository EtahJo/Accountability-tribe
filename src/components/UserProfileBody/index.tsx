import UpcomingSessions from '@/components/UpcomingSessions';
import TodoList from '@/components/TodoList';
import Posts from '@/components/Posts';
import Achievements from '@/components/Achievements';
import Tribes from '@/components/Tribes';
const UserProfileBody = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-9">
        <UpcomingSessions />
        <TodoList />
        <Posts />
      </div>
      <div className="col-start-10 col-end-11">
        <Achievements />
        <Tribes />
      </div>
    </div>
  );
};

export default UserProfileBody;
