'use client';
import useSWR from 'swr';
import SectionHeader from '@/components/SectionHeader/index';
import HeroLoggedIn from '@/components/HomePage/HeroSection/HeroLoggedIn';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails/index';

import UpcomingSessionDetailSkeleton from '../Skeletons/UpcomingSessionDetailSkeleton';

import ContactSection from '@/components/ContactSection/ContactSection';
import { formatDateTime, isToday, checkIsAfter } from '@/util/DateTime';
import { User } from '@prisma/client';
import TasksCarousel from './RecommendedTasksCarousel';
import RecommendedTribesCarousel from '@/components/HomePage/RecommendedTribesCarousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HomeLoggedInProps {
  user: User;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HomeLoggedIn = ({ user }: HomeLoggedInProps) => {
  const { data: session, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/sessions/${user.username}/closest-session`,
    fetcher
  );

  return (
    <div className="pb-48 px-20">
      <HeroLoggedIn />
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

            <TasksCarousel />
          </div>

          <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col w-full ">
            <h1 className="text-2xl font-bold text-white uppercase ml-5">
              {' '}
              Some Tribes to Visit
            </h1>
            <RecommendedTribesCarousel userId={user.id} />
          </div>
        </div>

        <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col ">
          <h1 className="text-2xl font-bold text-white uppercase mb-3">
            {' '}
            Your Next Session
          </h1>
          {isLoading ? (
            <UpcomingSessionDetailSkeleton />
          ) : session ? (
            <UpcomingSessionDetail
              startDate={
                formatDateTime(
                  session.session.startDateTime,
                  user?.timezone as string
                ).date
              }
              startTime={
                formatDateTime(
                  session.session.startDateTime,
                  user?.timezone as string
                ).time
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
                formatDateTime(
                  session.session.endDateTime,
                  user.timezone as string
                ).date
              }
              endTime={
                formatDateTime(
                  session.session.endDateTime,
                  user.timezone as string
                ).time
              }
              isMember={session.session.users.some(
                (participant: any) => participant.userId === user.id
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
