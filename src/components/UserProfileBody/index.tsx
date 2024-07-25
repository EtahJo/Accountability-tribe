'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import UpcomingSessions from '@/components/UpcomingSessions/index';
import TodoList from '@/components/TodoList/index';
import UserPosts from '@/components/Posts/UserPosts';
import Achievements from '@/components/Achievements/index';
import Tribes from '@/components/Tribes/index';

interface UserProfileBodyProps {
  pageUserName: string;
}

const UserProfileBody = ({ pageUserName }: UserProfileBodyProps) => {
  const { user }: any = useCurrentUser();

  return (
    <div className="grid grid-cols-12 pb-24">
      <div className="xl:col-start-2 xl:col-end-9 col-start-2 col-end-11">
        <UpcomingSessions pageUsername={pageUserName} />
        {pageUserName === user?.username && (
          <TodoList pageUsername={pageUserName} />
        )}

        <UserPosts pageUsername={pageUserName} />
      </div>
      <div className="xl:col-start-10 xl:col-end-12  col-start-2 col-end-11 flex justify-around xl:flex-col flex-row xl:justify-start flex-wrap">
        <Achievements pageUsername={pageUserName} />
        <Tribes pageUsername={pageUserName} />
      </div>
    </div>
  );
};

export default UserProfileBody;
