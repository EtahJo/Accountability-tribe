'use client';
import useSWR from 'swr';
import { useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import UpcomingSession from '@/components/UpcomingSession/index';
import { FaPlusCircle, FaArrowRight } from 'react-icons/fa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Link from 'next/link';

import {
  formatDateTime,
  getTimeDifference,
  isToday,
  isThisWeek,
  checkIsAfter,
} from '@/util/DateTime';
interface UpcomingSessionsProps {
  pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UpcomingSessions = ({ pageUsername }: UpcomingSessionsProps) => {
  const { user: currentUser }: any = useCurrentUser();
  const { data: sessions } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/sessions/${pageUsername}/${
      currentUser.id
    }?page=${1}&filter=${'all'}`,
    fetcher
  );
  return (
    <div>
      <SectionHeader
        name="Upcoming Work or Study Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
        pageUsername={pageUsername as string}
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />

      {sessions?.sessions?.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10">
          <div>
            <p>You have no upcoming sessions</p>
            {/* TODO: add session recommendations */}
          </div>
        </div>
      ) : (
        <div>
          <Carousel
            opts={{
              align: 'center',
            }}
            className="w-full"
          >
            <CarouselContent>
              {sessions?.map(
                ({
                  session,
                  userRole,
                  isMember,
                  goal,
                  isUserAdmin,
                  participants,
                  admin,
                  userId,
                  sessionParticipantId,
                  user,
                  tasks,
                }: any) => {
                  return (
                    <CarouselItem
                      key={session.id}
                      className="lg:basis-1/2 md:1"
                    >
                      <UpcomingSession
                        tasks={tasks}
                        pageUser={user}
                        startDate={
                          formatDateTime(
                            session.startDateTime,
                            currentUser?.timezone
                          ).date
                        }
                        startTime={
                          formatDateTime(
                            session.startDateTime,
                            currentUser?.timezone
                          ).time
                        }
                        endDate={
                          formatDateTime(
                            session.endDateTime,
                            currentUser?.timezone
                          ).date
                        }
                        endTime={
                          formatDateTime(
                            session.endDateTime,
                            currentUser?.timezone
                          ).time
                        }
                        goal={goal || session.goal}
                        duration={JSON.parse(session.duration)}
                        timeLeft={parseFloat(
                          getTimeDifference(session.startDateTime).minutes
                        )}
                        isTodayCheck={isToday(session.startDateTime)}
                        isAfter={checkIsAfter(session.endDateTime)}
                        meetingLink={session.meetingLink}
                        sessionId={session.id}
                        isAdmin={isUserAdmin}
                        isMember={isMember}
                        members={participants.participants.length}
                        admin={admin.username}
                        userId={userId}
                        endDateTime={session.endDateTime}
                        sessionParticipantId={sessionParticipantId}
                      />
                    </CarouselItem>
                  );
                }
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
      <div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto ">
        <Link href={`/user/${pageUsername}/sessions?page=1&filter=all`}>
          View All Sessions
        </Link>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default UpcomingSessions;
