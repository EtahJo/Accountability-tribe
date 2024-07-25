'use client';
import { useState } from 'react';

import { UpcomingSessionProps } from '@/components/UpcomingSession/index';
import { Button } from '@/components/ui/button';
import { FaPen } from 'react-icons/fa';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';

import { formatDateTime, getTimeDifference } from '@/util/DateTime';
import { isAfter, isToday, isThisWeek, isBefore } from 'date-fns';

import UpcomingSessionDetailHeader from '@/components/UpcomingSessionDetails/UpcomingSessionDetailHeader';
import AboutSession from '@/components/UpcomingSessionDetails/AboutSession';
import DeleteSession from '@/components/UpcomingSessionDetails/DeleteSession';
import LeaveSession from '@/components/UpcomingSessionDetails/LeaveSession';
import DuplicateSession from '@/components/UpcomingSessionDetails/DuplicateSession';
import AddSession from '@/components/UpcomingSessionDetails/AddSession';
import SessionTasks from '@/components/UpcomingSessionDetails/SessionTasks';
import TimeDurationDetails from '@/components/UpcomingSessionDetails/TimeDurationDetails';
import SessionNewTitleForm from '@/components/Forms/SessionNewTitleForm';

interface UpcomingSessionDetailProps {
  upcomingSessionChildren?: React.ReactNode;
  tasks?: {}[];
  pageUser?: { tasks: {}[] };
  pageUsername?: string;
  sessionParticipantId: string;
  showDeleteOrLeave?: boolean;
  startDateTime: string;
  endDateTime: string;
}
const UpcomingSessionDetail = ({
  goal,
  duration,
  meetingLink,
  isAdmin,
  sessionId,
  isMember,
  members,
  admin,
  endDateTime,
  tasks, // tasks already part of the session
  pageUser, // the user logged in
  sessionParticipantId,
  showDeleteOrLeave,
  pageUsername,
  startDateTime,
}: UpcomingSessionProps & UpcomingSessionDetailProps) => {
  const { user }: any = useCurrentUser();
  const [editGoal, setEditGoal] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);
  const timeLeft = parseFloat(getTimeDifference(startDateTime).minutes);

  const isEndToday = isToday(endDateTime);
  const startDate = formatDateTime(startDateTime, user?.timezone).date;
  const startTime = formatDateTime(startDateTime, user?.timezone).time;
  const endDate = formatDateTime(endDateTime, user?.timezone).date;
  const endTime = formatDateTime(endDateTime, user?.timezone).time;
  const now = new Date();
  const isTodayCheck = isToday(startDateTime);
  const isWeekCheck = isThisWeek(startDateTime);
  const checkIfAfter = isAfter(now, endDateTime);
  const onGoing = isAfter(now, startDateTime) && isBefore(now, endDateTime);

  return (
    <div className="bg-white min-[489px]:p-5 rounded-3xl shadow-3xl p-1 ">
      <UpcomingSessionDetailHeader
        isThisWeekCheck={isWeekCheck}
        timeLeft={timeLeft}
        isTodayCheck={isTodayCheck}
        startDate={startDate}
        startTime={startTime}
        onGoing={onGoing}
        checkIfAfter={checkIfAfter}
      />
      <div className="flex items-center gap-4 flex-wrap ">
        <div>
          <div className="flex flex-col gap-y-6 p-4 border-purple border-2 rounded-3xl my-2">
            <TimeDurationDetails
              startDate={startDate}
              startTime={startTime}
              endDate={endDate}
              endTime={endTime}
              duration={duration}
            />

            <div className="bg-lighterPink p-5 rounded-2xl flex justify-between items-center">
              <div>
                {editGoal ? (
                  <SessionNewTitleForm
                    goal={goal}
                    sessionId={sessionId}
                    doneFunction={() => {
                      setEditGoal(false);
                      setNewGoal(goal);
                    }}
                  />
                ) : (
                  <>
                    <div className=" justify-center ">
                      <h1 className="text-2xl font-bold -mr-4">Title</h1>
                    </div>

                    <p>{goal}</p>
                  </>
                )}
              </div>
              {!onGoing && !editGoal && isMember && !checkIfAfter && (
                <Button
                  className="move-button"
                  onClick={() => {
                    setEditGoal(true);
                  }}
                  type="button"
                >
                  <FaPen className="text-lightPink" />
                </Button>
              )}
            </div>
            <AboutSession
              isAdmin={isAdmin}
              isMember={isMember}
              members={members}
              admin={admin}
            />

            <div className="flex flex-col gap-y-4">
              {isEndToday && (
                <DuplicateSession
                  goal={goal}
                  pageUser={pageUser}
                  sessionId={sessionId}
                />
              )}

              {isMember ? (
                <>
                  {onGoing && (
                    <Button size={'slg'} className="py-3 move-button">
                      <Link href={meetingLink}>Join</Link>
                    </Button>
                  )}
                  {timeLeft > 2 && !checkIfAfter && isAdmin && (
                    <Button className="move-button py-3" size={'slg'}>
                      <Link href={`/edit-session/${sessionId}`}>Edit</Link>
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {!checkIfAfter && (
                    <AddSession goal={goal} sessionId={sessionId} />
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {(checkIfAfter || members === 1) && showDeleteOrLeave && isAdmin ? (
              <DeleteSession sessionId={sessionId} />
            ) : (
              isMember &&
              showDeleteOrLeave && <LeaveSession sessionId={sessionId} />
            )}
          </div>
        </div>
        <SessionTasks
          tasks={tasks}
          sessionParticipantId={sessionParticipantId}
          isMember={isMember}
          isAfter={checkIfAfter}
          pageUsername={pageUsername}
        />
      </div>
    </div>
  );
};

export default UpcomingSessionDetail;
