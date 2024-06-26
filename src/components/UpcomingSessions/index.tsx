'use client';
import { useContext } from 'react';
import SectionHeader from '@/components/SectionHeader';
import UpcomingSession from '@/components/UpcomingSession';
import { PeriodContext } from '@/context/PeriodContext';
import { FaPlusCircle } from 'react-icons/fa';

import {
  formatDateTime,
  getTimeDifference,
  isToday,
  isThisWeek,
  checkIsAfter,
} from '@/util/DateTime';
interface UpcomingSessionsProps {
  user: { timezone: string; id: string };
  sessions:
    | {
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
        userGoal: string;
        isUserAdmin: boolean;
        participants: {
          number_of_countries: number;
          participants: [];
        };
        admin: {
          username: string;
        };
      }[]
    | undefined;
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
              session,
              userRole,
              isMember,
              userGoal,
              isUserAdmin,
              participants,
              admin,
            }) => {
              return (
                <div key={session.id}>
                  {period == 'day' &&
                    (isToday(session.startDateTime) ||
                      isToday(session.endDateTime)) && (
                      <UpcomingSession
                        startDate={
                          formatDateTime(session.startDateTime, user?.timezone)
                            .date
                        }
                        startTime={
                          formatDateTime(session.startDateTime, user?.timezone)
                            .time
                        }
                        endDate={
                          formatDateTime(session.endDateTime, user?.timezone)
                            .date
                        }
                        endTime={
                          formatDateTime(session.endDateTime, user?.timezone)
                            .time
                        }
                        goal={userGoal || session.goal}
                        duration={JSON.parse(session.duration)}
                        timeLeft={parseFloat(
                          getTimeDifference(session.startDateTime).minutes
                        )}
                        isToday={isToday(session.startDateTime)}
                        isAfter={checkIsAfter(session.endDateTime)}
                        meetingLink={session.meetingLink}
                        sessionId={session.id}
                        isAdmin={isUserAdmin}
                        isMember={isMember}
                        members={participants.participants.length}
                        admin={admin.username}
                      />
                    )}
                  {period == 'week' && isThisWeek(session.startDateTime) && (
                    <UpcomingSession
                      startDate={
                        formatDateTime(session.startDateTime, user?.timezone)
                          .date
                      }
                      startTime={
                        formatDateTime(session.startDateTime, user?.timezone)
                          .time
                      }
                      endDate={
                        formatDateTime(session.endDateTime, user?.timezone).date
                      }
                      endTime={
                        formatDateTime(session.endDateTime, user?.timezone).time
                      }
                      goal={userGoal || session.goal}
                      duration={JSON.parse(session.duration)}
                      timeLeft={parseFloat(
                        getTimeDifference(session.startDateTime).minutes
                      )}
                      isToday={isToday(session.startDateTime)}
                      isAfter={checkIsAfter(session.endDateTime)}
                      meetingLink={session.meetingLink}
                      sessionId={session.id}
                      isMember={isMember}
                      isAdmin={isUserAdmin}
                      members={participants.participants.length}
                      admin={admin.username}
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
