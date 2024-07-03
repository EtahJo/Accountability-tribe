'use client';
import { useContext, useEffect, useState } from 'react';
import { PeriodContext } from '@/context/PeriodContext';
import { FaClock, FaCalendar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import FullTextOnHover from '@/components/FullTextOnHover';
import UpcomingSessionDetail from '../UpcomingSessionDetails/index';
import Link from 'next/link';

export interface UpcomingSessionProps {
  startDate: string;
  startTime: string;
  goal: string;
  duration: { hours: string; minutes: string };
  timeLeft: number;
  isTodayCheck: boolean;
  isAfter: boolean;
  meetingLink: string;
  isAdmin?: boolean;
  sessionId: string;
  userId: string;
  endDate: string;
  endTime: string;
  isMember?: boolean;
  members: number;
  admin?: string;
  endDateTime: string;
}

const UpcomingSession = ({
  startDate,
  startTime,
  goal,
  duration,
  timeLeft,
  isTodayCheck,
  isAfter,
  meetingLink,
  isAdmin,
  sessionId,
  endDate,
  endTime,
  isMember,
  members,
  admin,
  userId,
  endDateTime,
}: UpcomingSessionProps) => {
  const { period } = useContext(PeriodContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {}, [isMember]);

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
          <FullTextOnHover text={goal} isAfter={isAfter} />

          {period == 'day' && (
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
                  {isAfter ? 'Ended' : 'Started'}
                </p>
              )}
            </div>
          )}
          {period == 'week' && (
            <div className="flex items-center gap-1">
              <FaCalendar className="text-purple" />
              <p className="font-bold whitespace-nowrap text-xs">
                <>
                  {isAfter ? (
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

      {timeLeft <= 0 && !isAfter && (
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
      {timeLeft > 2 && !isAfter && isAdmin && (
        <Button className="move-button ">
          <Link href={`/edit-session/${sessionId}`}>Edit</Link>
        </Button>
      )}
      {/* {isAfter&&} */}

      <UpcomingSessionDetail
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        startDate={startDate}
        startTime={startTime}
        goal={goal}
        duration={duration}
        timeLeft={timeLeft}
        isTodayCheck={isTodayCheck}
        isAfter={isAfter}
        meetingLink={meetingLink}
        isAdmin={isAdmin}
        sessionId={sessionId}
        period={period}
        endDate={endDate}
        endTime={endTime}
        isMember={isMember}
        members={members}
        admin={admin}
        userId={userId}
        endDateTime={endDateTime}
      />
    </div>
  );
};

export default UpcomingSession;
