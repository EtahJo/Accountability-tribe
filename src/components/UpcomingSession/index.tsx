'use client';
import { useContext } from 'react';
import { PeriodContext } from '@/context/PeriodContext';
import { FaClock, FaCalendar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import FullTextOnHover from '@/components/FullTextOnHover';
import Link from 'next/link';

interface UpcomingSessionProps {
  date: string;
  time: string;
  goal: string;
  duration: string;
  timeLeft: number;
  isToday: boolean;
  isAfter: boolean;
  meetingLink: string;
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
}: UpcomingSessionProps) => {
  const { period } = useContext(PeriodContext);

  return (
    <div className="bg-white p-3 w-[370px] rounded-3xl flex items-center gap-3 my-2">
      <div className="flex  bg-lighterPink w-[130px] h-[80px] justify-center items-center rounded-3xl px-4 gap-2">
        <FaClock size={30} className="text-purple" />
        <div>
          <p className="text-[rgba(0,0,0,0.3)]">Duration</p>
          <p className="font-bold">{duration} hrs</p>
        </div>
      </div>
      <div>
        <FullTextOnHover text={goal} />

        {period == 'day' && (
          <div className="flex ">
            {timeLeft > 0 ? (
              <div className="flex gap-1">
                <p>Starts in </p>{' '}
                <p className="text-purple font-bold">{timeLeft} Mins</p>
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
            <p className="font-bold text-sm">
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
      {timeLeft <= 0 && !isAfter && (
        <Button className="move-button ">
          <Link href={meetingLink} target="_blank" rel="noopener noreferrer">
            Join
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UpcomingSession;
