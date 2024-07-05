'use client';
import { useEffect, useContext } from 'react';
import UpcomingSessions from '@/components/UpcomingSessions';
import TodoList from '@/components/TodoList';
import Posts from '@/components/Posts';
import Achievements from '@/components/Achievements';
import Tribes from '@/components/Tribes';
import SelectPeriod from '@/components/SelectPeriod';
// import { useMyProfileCheck } from '@/context/MyProfileCheckContext';
import { MyProfileCheckContext } from '@/context/MyProfileCheckContext';

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
  posts: {}[];
  tasks: {}[];
}

const UserProfileBody = ({
  user,
  sessions,
  pageUserName,
  children,
  posts,
  tasks,
}: UserProfileBodyProps) => {
  // const { myProfileCheck } = useMyProfileCheck();
  // const { myProfileCheck } = useContext(MyProfileCheckContext);
  // useEffect(() => {
  //   myProfileCheck(user?.username as string, pageUserName);
  //   // const fetchPosts=async()=>{

  //   // }
  // }, [sessions]);
  return (
    <div className="grid grid-cols-12 pb-24">
      <div className="col-start-2 col-end-9">
        <SelectPeriod />
        <UpcomingSessions
          currentUser={user}
          sessions={sessions}
          username={pageUserName}
        />
        <TodoList tasks={tasks} pageUsername={pageUserName} />
        <Posts posts={posts} pageUsername={pageUserName} />
      </div>
      <div className="col-start-10 col-end-12">
        <Achievements tasks={tasks} />
        {children}
        {/* <Tribes tribes={tribes} joinTribe={joinTribe} /> */}
      </div>
    </div>
  );
};

export default UserProfileBody;
