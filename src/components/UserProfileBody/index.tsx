'use client';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import UpcomingSessions from '@/components/UpcomingSessions/index';
import TodoList from '@/components/TodoList/index';
import UserPosts from '@/components/Posts/UserPosts';
// import Posts from '@/components/Posts/UserPosts';
import Achievements from '@/components/Achievements/index';
import Tribes from '@/components/Tribes/index';

interface UserProfileBodyProps {
  pageUserName: string;
}

const UserProfileBody = ({ pageUserName }: UserProfileBodyProps) => {
  const { user }: any = useCurrentUser();

  return (
    <div className="grid grid-cols-12 pb-24">
      <div className="col-start-2 col-end-9">
        {/* <SelectPeriod /> */}
        <UpcomingSessions pageUsername={pageUserName} />
        {pageUserName === user?.username && (
          <TodoList pageUsername={pageUserName} />
        )}

        <UserPosts pageUsername={pageUserName} />
      </div>
      <div className="col-start-10 col-end-12">
        <Achievements pageUsername={pageUserName} />
        <Tribes pageUsername={pageUserName} />
      </div>
    </div>
  );
};

export default UserProfileBody;
