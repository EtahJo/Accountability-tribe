'use client';
import { useState } from 'react';

import { FaClock, FaCalendar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import FullTextOnHover from '@/components/FullTextOnHover/index';
import UpcomingSessionDetailModal from '../UpcomingSessionDetails/Modal';
import { formatDateTime, getTimeDifference } from '@/util/DateTime';
import { isAfter, isToday, isThisWeek, isBefore } from 'date-fns';
import { useCurrentUser } from '@/hooks/use-current-user';
import Link from 'next/link';
import GotoButton from '@/components/GoTo/index';

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
    <div className="bg-white p-3 w-[400px]  rounded-3xl flex items-center gap-2  justify-between move-button cursor-pointer m-4  shadow-3xl">
      <div
        className="flex items-center gap-1"
        onClick={() => setModalIsOpen(true)}
      >
        <div className="flex  bg-lighterPink  h-[80px] justify-center items-center rounded-3xl px-4 gap-2">
          <FaClock size={30} className="text-purple" />
          <div>
            <p className="text-[rgba(0,0,0,0.3)]">Duration</p>
            {duration && (
              <p className="font-bold whitespace-nowrap">
                {duration.hours}h {duration.minutes}m
              </p>
            )}
          </div>
        </div>
        <div>
          <FullTextOnHover text={goal} isAfter={checkIfAfter} />

          {isTodayCheck && (
            <div className="flex ">
              {timeLeft > 0 ? (
                <div className="flex gap-1 flex-nowrap">
                  <p className="text-sm whitespace-nowrap">Starts in </p>{' '}
                  <p className="text-purple font-bold text-sm whitespace-nowrap">
                    {timeLeft} Mins
                  </p>
                </div>
              ) : (
                <p className="text-purple font-extrabold">
                  {checkIfAfter ? 'Ended' : 'Started'}
                </p>
              )}
            </div>
          )}
          {!isTodayCheck && !checkIfAfter && (
            <div className="flex items-center gap-1">
              <FaCalendar className="text-purple" />
              <p className="font-bold whitespace-nowrap text-xs">
                <>
                  {checkIfAfter ? (
                    <p className="text-normal">Past</p>
                  ) : (
                    <>
                      {' '}
                      {isTodayCheck
                        ? timeLeft < 0
                          ? 'Started Today'
                          : 'Today'
                        : startDate}{' '}
                      at {startTime}
                    </>
                  )}
                </>
              </p>
            </div>
          )}
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
