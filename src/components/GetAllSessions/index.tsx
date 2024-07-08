'use client';
import { useState } from 'react';
import Link from 'next/link';
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
import FilterForm from '@/components/Forms/FilterForm';

const GetAllSessions = ({
  username,
  filter,
  prevPage,
  sessions,
  totalPages,
  current_user,
  page,
  nextPage,
  pageNumbers,
}: any) => {
  const [filteredData, setFilteredData] = useState(null);
  const isPageOutofRange = page > totalPages;
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
          // myProfile={username === current_user.username}
          pageUsername={username}
          classNames="col-start-2 col-end-12"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="col-start-2 col-end-3 my-3">
            <Button variant="outline">
              Filter :{' '}
              <p className="font-bold">
                {' '}
                {filter === 'thisWeek' ? 'THIS WEEK' : filter.toUpperCase()}
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
              data={sessions.sessions}
              getFilteredData={getFilteredData}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-5">
        {(filteredData ? filteredData : sessions.sessions)?.map(
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
          }: any) => {
            return (
              <div
                className="bg-white w-[450px] p-2 rounded-2xl shadow-3xl h-max "
                key={session.id}
              >
                <UpcomingSession
                  startDate={
                    formatDateTime(
                      session.startDateTime,
                      current_user?.timezone
                    ).date
                  }
                  startTime={
                    formatDateTime(
                      session.startDateTime,
                      current_user?.timezone
                    ).time
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
            );
          }
        )}
      </div>
      {totalPages === 0 && (
        <div className="m-auto flex justify-center  h-screen">
          <p className="bg-white rounded-xl p-2 h-10">
            {' '}
            No sessions{' '}
            {filter === 'thisWeek' ? 'THIS WEEK' : filter.toUpperCase()}
          </p>
        </div>
      )}
      {isPageOutofRange && totalPages !== 0 ? (
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
              href={`?page=${prevPage}&filter=${filter}`}
              className="cursor-pointer
           bg-purple rounded-xl shadow-3xl  p-2 move-button"
              aria-label="Previous page"
            >
              Previous
            </Link>
          )}
          {pageNumbers.map((pageNumber: any, index: any) => (
            <Link
              key={index}
              href={`?page=${pageNumber}&filter=${filter}`}
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
              href={`?page=${nextPage}&filter=${filter}`}
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

export default GetAllSessions;
