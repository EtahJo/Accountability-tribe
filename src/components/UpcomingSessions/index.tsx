'use client';
import { useEffect } from 'react';
import SectionHeader from '@/components/SectionHeader/index';
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
  currentUser: { username: string; timezone: string; id: string };
  username: string;
  sessions: {
    session: {
      id: string;
      startDateTime: string;
      endDateTime: string;
      duration: string;
      meetingLink: string;
      goal: string;
    };
    userRole: string;
    isMember: boolean;
    tasks: {}[];
    user: {};
    goal: string;
    isUserAdmin: boolean;
    userId: string;
    sessionParticipantId: string;
    participants: {
      number_of_countries: number;
      participants: [];
    };
    admin: {
      username: string;
    };
  }[];
}

const UpcomingSessions = ({
  currentUser,
  sessions,
  username,
}: UpcomingSessionsProps) => {
  return (
    <div>
      <SectionHeader
        name="Upcoming Work or Study Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
        pageUsername={username}
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />

      {sessions?.length === 0 ? (
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
                }) => {
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
        <Link href={`/user/${username}/sessions?page=1&filter=all`}>
          View All Sessions
        </Link>
        <FaArrowRight />
      </div>
    </div>
  );
};

export default UpcomingSessions;
