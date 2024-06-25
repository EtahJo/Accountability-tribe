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
interface UpcomingSessionsProps {
  user: {} | undefined;
  sessions: [] | undefined;
}

const UpcomingSessions = ({ user, sessions }: UpcomingSessionsProps) => {
  const { period } = useContext(PeriodContext);

  return (
    <div>
      <SectionHeader
        name="Upcoming Work or Study Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
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
        <div className="flex flex-wrap gap-3 my-5">
          {sessions?.map(
            ({
              startDateTime,
              goal,
              duration,
              endDateTime,
              meetingLink,
              id,
              creatorId,
            }) => {
              const check = user?.id === creatorId;
              return (
                <div key={id}>
                  {period == 'day' &&
                    (isToday(startDateTime) || isToday(endDateTime)) && (
                      <UpcomingSession
                        startDate={
                          formatDateTime(startDateTime, user?.timezone).date
                        }
                        startTime={
                          formatDateTime(startDateTime, user?.timezone).time
                        }
                        endDate={
                          formatDateTime(endDateTime, user?.timezone).date
                        }
                        endTime={
                          formatDateTime(endDateTime, user?.timezone).time
                        }
                        goal={goal}
                        duration={JSON.parse(duration)}
                        timeLeft={parseFloat(
                          getTimeDifference(startDateTime).minutes
                        )}
                        isToday={isToday(startDateTime)}
                        isAfter={checkIsAfter(endDateTime)}
                        meetingLink={meetingLink}
                        sessionId={id}
                        isAdmin={user?.id === creatorId}
                        creatorId={creatorId}
                      />
                    )}
                  {period == 'week' && isThisWeek(startDateTime) && (
                    <UpcomingSession
                      startDate={
                        formatDateTime(startDateTime, user?.timezone).date
                      }
                      startTime={
                        formatDateTime(startDateTime, user?.timezone).time
                      }
                      endDate={formatDateTime(endDateTime, user?.timezone).date}
                      endTime={formatDateTime(endDateTime, user?.timezone).time}
                      goal={goal}
                      duration={JSON.parse(duration)}
                      timeLeft={parseFloat(
                        getTimeDifference(startDateTime).minutes
                      )}
                      isToday={isToday(startDateTime)}
                      isAfter={checkIsAfter(endDateTime)}
                      meetingLink={meetingLink}
                      sessionId={id}
                      isAdmin={user?.id === creatorId}
                      creatorId={creatorId}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;
