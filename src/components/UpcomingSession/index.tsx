'use client';
import { useContext } from 'react';
import { PeriodContext } from '@/context/PeriodContext';
import { FaClock, FaCalendar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import FullTextOnHover from '@/components/FullTextOnHover';
import UpcomingSessionDetail from '../UpcomingSessionDetails/index';
import Link from 'next/link';

interface UpcomingSessionProps {
  date: string;
  time: string;
  goal: string;
  duration: { hours: string; minutes: string };
  timeLeft: number;
  isToday: boolean;
  isAfter: boolean;
  meetingLink: string;
  isAdmin?: boolean;
  sessionId: string;
}

const UpcomingSession = ({
  date,
  time,
  goal,
  duration,
  timeLeft,
  isToday,
  isAfter,
  meetingLink,
  isAdmin,
  sessionId,
}: UpcomingSessionProps) => {
  const { period } = useContext(PeriodContext);

  return (
    <div className="bg-white p-3 w-[390px] rounded-3xl flex items-center gap-2 my-2 justify-between">
      <div className="flex items-center gap-1">
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
          <FullTextOnHover text={goal} />

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
                    'Past'
                  ) : (
                    <>
                      {' '}
                      {isToday ? 'Today' : date} at {time}
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
    </div>
  );
};

export default UpcomingSession;
