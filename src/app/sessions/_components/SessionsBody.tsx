'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSearchParams } from 'next/navigation';
import PaginationController from '@/components/PaginationController';
import UpcomingSession from '@/components/UpcomingSession';
import UpcomingSessionSkeleton from '@/components/Skeletons/UpcomingSessionSkeleton';
import { SessionParticipant } from '@prisma/client';
import SessionFilter from './SessionFilter';
import FilterForm from '@/components/Forms/FilterForm';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const SessionsBody = () => {
  const [filteredData, setFilteredData] = useState(null);
  const { user }: any = useCurrentUser();
  const searchParams = useSearchParams();
  let page = parseInt(searchParams?.get('page') as string, 10);
  page = !page || page < 1 ? 1 : page;
  const filter = searchParams.get('filter');
  const { data: sessionsData, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/sessions/api?page=${page}&filter=${filter}`,
    fetcher
  );
  if (isLoading || sessionsData === undefined) {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <UpcomingSessionSkeleton key={index} />
        ))}
      </div>
    );
  }
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= sessionsData?.totalPages) {
      pageNumbers.push(i);
    }
  }
  const getFilteredData = (data: any) => {
    setFilteredData(data);
  };
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center flex-col gap-y-3">
        <SessionFilter page={page} />
        {/* TODO: connect filter form to searchparams */}
        <FilterForm
          data={sessionsData?.sessions}
          getFilteredData={getFilteredData}
        />
      </div>

      <div className="flex items-center flex-wrap justify-between">
        {(filteredData ? filteredData : sessionsData?.sessions)?.map(
          (session: any) => {
            const checkUser = session.users.filter(
              (sessionsParticipant: SessionParticipant) =>
                sessionsParticipant.userId === user.id
            );
            const tasks = checkUser.length === 1 ? checkUser[0].tasks : null;
            const sessionParticipant =
              checkUser.length === 1 ? checkUser[0] : null;

            return (
              <UpcomingSession
                key={session.id}
                startDateTime={session.startDateTime}
                goal={sessionParticipant?.goal || session.goal}
                duration={JSON.parse(session.duration)}
                meetingLink={session.meetingLink}
                isAdmin={session.adminUsername === user.username}
                sessionId={session.id}
                isMember={session.users.some(
                  (sessionParticipant: SessionParticipant) =>
                    sessionParticipant.userId === user.id
                )}
                members={session.users.length}
                admin={session.adminUsername}
                userId={sessionParticipant?.userId}
                endDateTime={session.endDateTime}
                tasks={tasks}
                pageUser={user}
                pageUsername={user.username}
                sessionParticipantId={sessionParticipant?.id}
              />
            );
          }
        )}
      </div>
      <PaginationController
        prevPage={prevPage}
        nextPage={nextPage}
        pageNumbers={pageNumbers}
        hasMore={sessionsData.hasMore}
        page={page}
        totalPages={sessionsData.totalPages}
      />
    </div>
  );
};

export default SessionsBody;
