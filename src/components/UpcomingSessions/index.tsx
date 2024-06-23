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
  console.log(user);

  return (
    <div>
      <SectionHeader
        name="Upcoming Work or Study Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />

      <div className="flex flex-wrap gap-2 my-5">
        {user?.sessions.map(
          ({
            startDateTime,
            goal,
            duration,
            endDateTime,
            googleLink,
            id,
            creatorId,
          }) => (
            <div key={id}>
              {period == 'day' &&
                (isToday(startDateTime) || isToday(endDateTime)) && (
                  <UpcomingSession
                    date={formatDateTime(startDateTime, user?.timezone).date}
                    time={formatDateTime(startDateTime, user?.timezone).time}
                    goal={goal}
                    duration={JSON.parse(duration)}
                    timeLeft={parseFloat(
                      getTimeDifference(startDateTime).minutes
                    )}
                    isToday={isToday(startDateTime)}
                    isAfter={checkIsAfter(endDateTime)}
                    meetingLink={googleLink}
                    sessionId={id}
                    isAdmin={user?.id === creatorId}
                  />
                )}
              {period == 'week' && isThisWeek(startDateTime) && (
                <UpcomingSession
                  date={formatDateTime(startDateTime, user?.timezone).date}
                  time={formatDateTime(startDateTime, user?.timezone).time}
                  goal={goal}
                  duration={JSON.parse(duration)}
                  timeLeft={parseFloat(
                    getTimeDifference(startDateTime).minutes
                  )}
                  isToday={isToday(startDateTime)}
                  isAfter={checkIsAfter(endDateTime)}
                  meetingLink={googleLink}
                  sessionId={id}
                  isAdmin={user?.id === creatorId}
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
