'use client';
import UpcomingSessions from '@/components/UpcomingSessions';
import TodoList from '@/components/TodoList';
import Posts from '@/components/Posts';
import Achievements from '@/components/Achievements';
import SelectPeriod from '@/components/SelectPeriod';

interface UserProfileBodyProps {
  user: { username: string } | undefined;
  sessions: {}[] | undefined;
  tribes:
    | ({
        tribe: {
          id: string;
          name: string;
          description: string | null;
          profileImage: string | null;
        };
      } & { id: string; userId: string; tribeId: string; userRole: string })[]
    | null
    | undefined;
  children?: React.ReactNode;
  pageUserName: string;
  posts?: {}[];
  tasks: {}[];
  completedTasks: {}[];
}

const UserProfileBody = ({
  user, // current user
  sessions,
  pageUserName,
  children,
  posts,
  tasks,
  completedTasks,
}: UserProfileBodyProps) => {
  return (
    <div className="grid grid-cols-12 pb-24">
      <div className="col-start-2 col-end-9">
        {/* <SelectPeriod /> */}
        <UpcomingSessions
          currentUser={user}
          sessions={sessions}
          username={pageUserName}
        />
        {pageUserName === user?.username && (
          <TodoList tasks={tasks} pageUsername={pageUserName} />
        )}

        <Posts posts={posts} pageUsername={pageUserName} />
      </div>
      <div className="col-start-10 col-end-12">
        <Achievements completedTasks={completedTasks} />
        {children}
      </div>
    </div>
  );
};

export default UserProfileBody;
