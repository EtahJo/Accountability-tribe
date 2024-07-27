'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FullTextOnHover from '@/components/FullTextOnHover/index';
import UpcomingSessionDetailModal from '../UpcomingSessionDetails/Modal';
import { formatDateTime, getTimeDifference } from '@/util/DateTime';
import { isAfter, isToday, isBefore } from 'date-fns';
import { useCurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';
import GotoButton from '@/components/GoTo/index';
import SessionDuration from '@/components/UpcomingSession/SessionDuration';
import PeriodCheck from '@/components/UpcomingSession/PeriodCheck';
export interface UpcomingSessionProps {
  goal: string;
  duration: { hours: string; minutes: string };
  meetingLink: string;
  isAdmin?: boolean;
  sessionId: string;
  userId: string;
  isMember?: boolean;
  members: number;
  admin?: string;
  endDateTime: string;
  tasks?: {}[];
  pageUser?: any;
  pageUsername: string;
  sessionParticipantId: string;
  startDateTime: string;
}

const UpcomingSession = ({
  goal,
  duration,
  meetingLink,
  isAdmin,
  sessionId,
  isMember,
  members,
  admin,
  userId,
  endDateTime,
  tasks,
  pageUser,
  sessionParticipantId,
  startDateTime,
  pageUsername,
}: UpcomingSessionProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user }: any = useCurrentUser();

  const startDate = formatDateTime(startDateTime, user?.timezone).date;
  const startTime = formatDateTime(startDateTime, user?.timezone).time;

  const now = new Date();
  const isTodayCheck = isToday(startDateTime);
  const checkIfAfter = isAfter(now, endDateTime);
  const onGoing = isAfter(now, startDateTime) && isBefore(now, endDateTime);
  const timeLeft = parseFloat(getTimeDifference(startDateTime).minutes);

  return (
    <div
      className="bg-white p-3 largePhone:w-[380px]  rounded-3xl flex items-center gap-2  largePhone:justify-between move-button cursor-pointer m-4 
     shadow-3xl justify-center largePhone:flex-row flex-col medPhone:w-[250px] min-[350px]:w-[180px] w-[150px]"
    >
      <div
        className="flex items-center gap-1 largePhone:flex-row flex-col"
        onClick={() => setModalIsOpen(true)}
      >
        <SessionDuration duration={duration} />
        <div
          className="flex flex-col
        largePhone:justify-start justify-center items-center largePhone:items-start"
        >
          <FullTextOnHover text={goal} isAfter={checkIfAfter} />
          <PeriodCheck
            isTodayCheck={isTodayCheck}
            timeLeft={timeLeft}
            checkIfAfter={checkIfAfter}
            startTime={startTime}
            startDate={startDate}
          />
        </div>
      </div>

      {onGoing && (
        <Button className="move-button ">
          <Link
            href={meetingLink || '/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join
          </Link>
        </Button>
      )}
      {timeLeft > 2 && !checkIfAfter && isAdmin && (
        <GotoButton title="Edit" href={`/edit-session/${sessionId}`} />
      )}

      <UpcomingSessionDetailModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        goal={goal}
        duration={duration}
        meetingLink={meetingLink}
        isAdmin={isAdmin}
        sessionId={sessionId}
        isMember={isMember}
        members={members}
        admin={admin}
        userId={userId}
        endDateTime={endDateTime}
        tasks={tasks}
        pageUser={pageUser}
        sessionParticipantId={sessionParticipantId}
        startDateTime={startDateTime}
        pageUsername={pageUsername}
      />
    </div>
  );
};

export default UpcomingSession;
