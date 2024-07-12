import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import HeroLoggedIn from '@/components/HomePage/HeroSection/HeroLoggedIn';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails';
import Todo from '@/components/TodoList/Todo';
import { parseISO } from 'date-fns';
import ContactSection from '@/components/ContactSection/ContactSection';
import {
  formatDateTime,
  getTimeDifference,
  isToday,
  isThisWeek,
  checkIsAfter,
} from '@/util/DateTime';
import { highlightedUsersType } from '@/components/HomePage/HeroSection/HeroLoggedIn';
import {
  Task,
  SessionParticipant,
  Tribe,
  TribeUser,
  Session,
  User,
} from '@prisma/client';
import TasksCarousel from './RecommendedTasksCarousel';
import RecommendedTribesCarousel from '@/components/HomePage/RecommendedTribesCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type SelectedTaskProps = Pick<
  Task,
  'dueDate' | 'title' | 'description' | 'status' | 'id' | 'userId' | 'priority'
> & { sessionParticipants: SessionParticipant[] };
type TribeProps = Pick<
  Tribe,
  'name' | 'description' | 'id' | 'profileImage'
> & { users: TribeUser[] };
interface HomeLoggedInProps {
  highlightedUsers: highlightedUsersType[];
  highPriorityTasks: SelectedTaskProps[];
  recommendedTribes: TribeProps[];
  user: User;
  session?: any;
}

const HomeLoggedIn = ({
  highlightedUsers,
  highPriorityTasks,
  recommendedTribes,
  user,
  session,
}: HomeLoggedInProps) => {
  return (
    <div className="pb-48 px-20">
      <HeroLoggedIn highlightedUsers={highlightedUsers} />
      <SectionHeader name="Take Note" />
      <div
        className={cn('flex gap-2', session ? 'items-center' : 'items-start')}
      >
        <div className="w-3/4">
          <div className="bg-purple p-10 rounded-5xl my-5 flex flex-col w-full">
            <h1 className="text-2xl font-bold text-white uppercase mb-3">
              {' '}
              Some High Priority Task
            </h1>

            <TasksCarousel highPriorityTasks={highPriorityTasks} />
          </div>

          <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col w-full ">
            <h1 className="text-2xl font-bold text-white uppercase ml-5">
              {' '}
              Some Tribes to Visit
            </h1>
            <RecommendedTribesCarousel
              recommendedTribes={recommendedTribes}
              userId={user.id}
            />
          </div>
        </div>

        <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col ">
          <h1 className="text-2xl font-bold text-white uppercase mb-3">
            {' '}
            Your Next Session
          </h1>
          {session ? (
            <UpcomingSessionDetail
              startDate={
                formatDateTime(session.session.startDateTime, user.timezone)
                  .date
              }
              startTime={
                formatDateTime(session.session.startDateTime, user.timezone)
                  .time
              }
              goal={session?.goal}
              duration={JSON.parse(session.session.duration)}
              timeLeft={20}
              isTodayCheck={isToday(session.session.startDateTime)}
              isAfter={checkIsAfter(session.session.endDateTime)}
              meetingLink={session.session.meetingLink}
              isAdmin={session.adminUserName === user.username}
              sessionId={session.session.id}
              period={'day'}
              endDate={
                formatDateTime(session.session.endDateTime, user.timezone).date
              }
              endTime={
                formatDateTime(session.session.endDateTime, user.timezone).time
              }
              isMember={session.session.users.some(
                (participant) => participant.userId === user.id
              )}
              members={session.session.participants as number}
              admin={session.adminUserName}
              userId={session.userId} // the id of th user with the session
              endDateTime={session.session.endDateTime}
              tasks={session.tasks}
              pageUser={session.user.username}
              sessionParticipantId={session.id}
            />
          ) : (
            <div
              className="bg-white mx-10 w-3/4 p-5 flex flex-col 
            items-center justify-center rounded-2xl gap-4 "
            >
              <p className="whitespace-nowrap text-xl">No Upcoming Session</p>
              <Link href={'/create-session'}>
                <Button className="move-button">Create Session</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default HomeLoggedIn;
