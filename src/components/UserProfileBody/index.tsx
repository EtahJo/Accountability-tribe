'use client';
import { useState } from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';
import UpcomingSessions from '@/components/UpcomingSessions/index';
import TodoList from '@/components/TodoList/index';
import UserPosts from '@/components/Posts/UserPosts';
import Achievements from '@/components/Achievements/index';
import { Button } from '@/components/ui/button';
import Tribes from '@/components/Tribes/index';
import UserPostsModal from '@/components/Posts/UserPostsModal';

interface UserProfileBodyProps {
  pageUserName: string;
}

const UserProfileBody = ({ pageUserName }: UserProfileBodyProps) => {
  const [openPostsModal, setOpenPostsModal] = useState(false);
  const { user }: any = useCurrentUser();

  return (
    <div className="grid grid-cols-12 pb-24 largePhone:px-20 px-5">
      <div className="xl:col-start-1 xl:col-end-9 col-start-1 col-end-12 p-10">
        <UpcomingSessions pageUsername={pageUserName} />
        {pageUserName === user?.username && (
          <TodoList pageUsername={pageUserName} />
        )}
        <Button
          className="min-[508px]:hidden block m-auto my-5 text-lightPink shadow-3xl"
          variant={'outline'}
          onClick={() => setOpenPostsModal(true)}
        >
          View User Posts
        </Button>
        <div className="min-[508px]:block hidden ">
          <UserPosts pageUsername={pageUserName} />
        </div>
      </div>
      <div className="xl:col-start-10 xl:col-end-12  col-start-1 col-end-11 flex justify-around xl:flex-col flex-row xl:justify-start flex-wrap">
        <Achievements pageUsername={pageUserName} />
        <Tribes pageUsername={pageUserName} />
      </div>
      <UserPostsModal
        pageUsername={pageUserName}
        isOpen={openPostsModal}
        onRequestClose={() => setOpenPostsModal(false)}
      />
    </div>
  );
};

export default UserProfileBody;
