import { currentUser } from '@/lib/authentication';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails';
import SectionHeader from '@/components/SectionHeader';
import { FaPlusCircle } from 'react-icons/fa';
import UpcomingSession from '@/components/UpcomingSession/index';

import Link from 'next/link';
import {
  formatDateTime,
  getTimeDifference,
  isToday,
  checkIsAfter,
} from '@/util/DateTime';
import { cn } from '@/lib/utils';
async function getSessionData(
  username: string,
  currentUserId: string,
  page: number
) {
  const sessionRes = await fetch(
    `http://localhost:3000/user/api/sessions/${username}/${currentUserId}?page=${page}`,
    {
      next: {
        tags: ['userSessions'],
      },
    }
  );
  if (!sessionRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return sessionRes.json();
}

const UserSessions = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: any;
}) => {
  const { username } = params;
  const current_user: any = await currentUser();
  let page = parseInt(searchParams.page, 10);
  console.log('Frontend page', searchParams);
  page = !page || page < 1 ? 1 : page;
  const sessions = await getSessionData(
    username,
    current_user?.id as string,
    page
  );
  // console.log('Sessions are', sessions);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const totalPages = sessions.totalPages;
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  const isPageOutofRange = page > totalPages;

  return (
    <div className="h-full pb-32">
      <div className="grid grid-cols-12 my-5 mx-5">
        <SectionHeader
          name="Upcoming Work or Study Sessions"
          buttonLink="/create-session"
          buttonTitle="Create Session"
          buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
          // myProfile={username === current_user.username}
          pageUsername={username}
          classNames="col-start-2 col-end-12"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-5">
        {sessions.sessions?.map(
          ({
            session,
            userRole,
            isMember,
            goal,
            isUserAdmin,
            participants,
            admin,
            userId,
            tasks,
            sessionParticipantId,
            user,
          }: any) => (
            <div
              className="bg-white w-[450px] p-2 rounded-2xl shadow-3xl h-max "
              key={session.id}
            >
              <UpcomingSession
                startDate={
                  formatDateTime(session.startDateTime, current_user?.timezone)
                    .date
                }
                startTime={
                  formatDateTime(session.startDateTime, current_user?.timezone)
                    .time
                }
                goal={goal || session.goal}
                duration={JSON.parse(session.duration)}
                timeLeft={parseFloat(
                  getTimeDifference(session.startDateTime).minutes
                )}
                isTodayCheck={isToday(session.startDateTime)}
                isAfter={checkIsAfter(session.endDateTime)}
                meetingLink={session.meetingLink}
                isAdmin={isUserAdmin}
                sessionId={session.id}
                // period={'day'}
                endDate={
                  formatDateTime(session.endDateTime, current_user?.timezone)
                    .date
                }
                endTime={
                  formatDateTime(session.endDateTime, current_user?.timezone)
                    .time
                }
                isMember={isMember}
                members={participants.participants.length}
                admin={admin.username}
                userId={userId}
                endDateTime={session.endDateTime}
                tasks={tasks}
                pageUser={user}
                sessionParticipantId={sessionParticipantId}
              />
            </div>
          )
        )}
      </div>

      {isPageOutofRange ? (
        <div className="m-auto flex justify-center  h-screen">
          <p className="bg-white rounded-xl p-2 h-10">Page out of range...</p>
        </div>
      ) : (
        <div
          className=" flex justify-center gap-4 text-white
        m-auto text-xl font-bold"
        >
          {page === 1 ? (
            <div
              className="opacity-50 bg-purple rounded-2xl shadow-3xl  p-2 move-button"
              aria-disabled={true}
            >
              Previous
            </div>
          ) : (
            <Link
              href={`?page=${prevPage}`}
              className="cursor-pointer
               bg-purple rounded-xl shadow-3xl  p-2 move-button"
              aria-label="Previous page"
            >
              Previous
            </Link>
          )}
          {pageNumbers.map((pageNumber, index) => (
            <Link
              key={index}
              href={`?page=${pageNumber}`}
              className={cn(
                'cursor-pointer bg-purple rounded-xl shadow-3xl  p-2 move-button',
                pageNumber === page && 'bg-black'
              )}
              aria-label="Previous page"
            >
              {pageNumber}
            </Link>
          ))}
          {sessions.hasMore ? (
            <Link
              href={`?page=${nextPage}`}
              className={cn(
                'cursor-pointer move-button bg-purple rounded-xl shadow-3xl  p-2'
              )}
              aria-label="Next page"
            >
              Next
            </Link>
          ) : (
            <div
              className="opacity-50 bg-purple rounded-xl shadow-3xl  p-2 move-button"
              aria-disabled={true}
            >
              Next
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSessions;
