'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import UpcomingSession from '@/components/UpcomingSession/index';
import { FaPlusCircle } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import CustomSelectInput from '@/components/CustomSelectInput/index';
import SectionHeader from '../SectionHeader/index';
import {
  formatDateTime,
  getTimeDifference,
  isToday,
  checkIsAfter,
} from '@/util/DateTime';
import { cn } from '@/lib/utils';
import { SessionParticipant } from '@prisma/client';
import FilterForm from '@/components/Forms/FilterForm';
import PaginationController from '../PaginationController';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const GetAllSessions = ({ username }: { username: string }) => {
  const [filteredData, setFilteredData] = useState(null);
  const searchParams = useSearchParams();
  let page = parseInt(searchParams?.get('page') as string, 10);
  page = !page || page < 1 ? 1 : page;
  const filter = searchParams.get('filter');
  const { user }: any = useCurrentUser();
  const { data: sessionsData, isLoading } = useSWR(
    `https://accountability-tribe.vercel.app/user/api/sessions/${username}/${user.id}?page=1&filter=${filter}`,
    fetcher
  );
  if (isLoading || sessionsData === undefined) {
    return null;
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

  const items = [
    {
      title: 'All',
      id: 'all',
    },
    {
      title: 'Ongoing',
      id: 'ongoing',
    },
    {
      title: 'Ended',
      id: 'ended',
    },
    {
      title: 'Today',
      id: 'today',
    },
    {
      title: 'Tomorrow',
      id: 'tomorrow',
    },
    {
      title: 'This Week',
      id: 'thisWeek',
    },
  ];
  return (
    <div className="h-screen pb-32">
      <div className="grid grid-cols-12 my-5 mx-5">
        <SectionHeader
          name="Upcoming Work or Study Sessions"
          buttonLink="/create-session"
          buttonTitle="Create Session"
          buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
          pageUsername={username}
          classNames="col-start-2 col-end-12"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="col-start-2 col-end-3 my-3">
            <Button variant="outline">
              Filter :{' '}
              <p className="font-bold">
                {' '}
                {filter === 'thisWeek' ? 'THIS WEEK' : filter?.toUpperCase()}
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {items.map((item) => (
              <DropdownMenuItem key={item.id}>
                <Link href={`?page=${prevPage}&filter=${item.id}`}>
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover>
          <PopoverTrigger asChild className="col-start-11 col-end-12 my-3">
            <Button>Select Duration</Button>
          </PopoverTrigger>
          <PopoverContent>
            <FilterForm
              data={sessionsData.sessions.sessions}
              getFilteredData={getFilteredData}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-5">
        {(filteredData ? filteredData : sessionsData.sessions.sessions).map(
          ({
            session,
            goal,
            adminUsername,
            userId,
            tasks,
            sessionParticipantId,
            user,
          }: any) => {
            return (
              <div
                className="bg-white w-[450px] p-2 rounded-2xl shadow-3xl h-max "
                key={session.id}
              >
                <UpcomingSession
                  startDate={
                    formatDateTime(session.startDateTime, user?.timezone).date
                  }
                  startTime={
                    formatDateTime(session.startDateTime, user?.timezone).time
                  }
                  goal={goal || session.goal}
                  duration={JSON.parse(session.duration)}
                  timeLeft={parseFloat(
                    getTimeDifference(session.startDateTime).minutes
                  )}
                  isTodayCheck={isToday(session.startDateTime)}
                  isAfter={checkIsAfter(session.endDateTime)}
                  meetingLink={session.meetingLink}
                  isAdmin={adminUsername === user.username}
                  sessionId={session.id}
                  // period={'day'}
                  endDate={
                    formatDateTime(session.endDateTime, user?.timezone).date
                  }
                  endTime={
                    formatDateTime(session.endDateTime, user?.timezone).time
                  }
                  isMember={session.users.some(
                    (sessionParticipant: SessionParticipant) =>
                      sessionParticipant.userId === user.id
                  )}
                  members={session.participants}
                  admin={adminUsername}
                  userId={userId}
                  endDateTime={session.endDateTime}
                  tasks={tasks}
                  pageUser={user}
                  sessionParticipantId={sessionParticipantId}
                />
              </div>
            );
          }
        )}
      </div>
      {sessionsData.totalPages === 0 && (
        <div className="m-auto flex justify-center  h-screen">
          <p className="bg-white rounded-xl p-2 h-10">
            {' '}
            No sessions{' '}
            {filter === 'thisWeek' ? 'THIS WEEK' : filter?.toUpperCase()}
          </p>
        </div>
      )}
      <PaginationController
        page={page}
        pageNumbers={pageNumbers}
        prevPage={prevPage}
        nextPage={nextPage}
        hasMore={sessionsData.hasMore}
        totalPages={sessionsData.totalPages}
      />
    </div>
  );
};

export default GetAllSessions;
