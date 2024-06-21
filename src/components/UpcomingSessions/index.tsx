'use client';
import { useContext } from 'react';
import SectionHeader from '@/components/SectionHeader';
import UpcomingSession from '@/components/UpcomingSession';
import { PeriodContext } from '@/context/PeriodContext';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FaPlusCircle } from 'react-icons/fa';

import {
  formatDateTime,
  getTimeDifference,
  isToday,
  isThisWeek,
  checkIsAfter,
} from '@/util/DateTime';

const UpcomingSessions = () => {
  const { period } = useContext(PeriodContext);
  const { user } = useCurrentUser();
  const tempSessions = [
    {
      duration: '2',
      goal: 'Get stuff done and lots more',
      dateTime: '2024-06-22T09:24:56.268Z',
      endDateTime: '2024-06-23T11:24:56.268Z',
      googleLink: '',
      admin: 'Etah',
    },
    {
      duration: '4',
      goal: 'Complete table on excel page',
      dateTime: '2024-06-21T10:24:56.268Z',
      endDateTime: '2024-06-21T14:24:56.268Z',
      googleLink: '',
      admin: 'Arrah',
    },
    {
      duration: '9',
      goal: 'code the homepage of my website',
      dateTime: '2024-06-21T19:24:56.268Z',
      endDateTime: '2024-06-21T20:24:56.268Z',
      googleLink: '',
      admin: 'Arrah',
    },
    {
      duration: '14',
      goal: 'Complete all the work tasks for the day and study 6 chapters',
      dateTime: '2024-06-20T22:24:56.268Z',
      endDateTime: '2024-06-21T12:24:56.268Z',
      googleLink: '',
      admin: 'Arrah',
    },
  ];

  return (
    <div>
      <SectionHeader
        name="Upcoming Work or Study Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />

      <div className="flex flex-wrap gap-2 my-5">
        {tempSessions.map(
          ({ dateTime, goal, duration, endDateTime, googleLink }, index) => (
            <div key={index}>
              {period == 'day' &&
                (isToday(dateTime) || isToday(endDateTime)) && (
                  <UpcomingSession
                    date={formatDateTime(dateTime, user?.timezone).date}
                    time={formatDateTime(dateTime, user?.timezone).time}
                    goal={goal}
                    duration={duration}
                    timeLeft={parseFloat(getTimeDifference(dateTime).minutes)}
                    isToday={isToday(dateTime)}
                    isAfter={checkIsAfter(endDateTime)}
                    meetingLink={googleLink}
                  />
                )}
              {period == 'week' && isThisWeek(dateTime) && (
                <UpcomingSession
                  date={formatDateTime(dateTime, user?.timezone).date}
                  time={formatDateTime(dateTime, user?.timezone).time}
                  goal={goal}
                  duration={duration}
                  timeLeft={parseFloat(getTimeDifference(dateTime).minutes)}
                  isToday={isToday(dateTime)}
                  isAfter={checkIsAfter(endDateTime)}
                  meetingLink={googleLink}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;
