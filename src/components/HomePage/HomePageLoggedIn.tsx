import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import HeroLoggedIn from '@/components/HomePage/HeroSection/HeroLoggedIn';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails';
import Todo from '@/components/TodoList/Todo';
import ContactSection from '@/components/ContactSection/ContactSection';
import {
  formatDateTime,
  getTimeDifference,
  isToday,
  isThisWeek,
  checkIsAfter,
} from '@/util/DateTime';
import { date } from 'zod';
const HomeLoggedIn = ({ highlightedUsers }: { highlightedUsers: {}[] }) => {
  return (
    <div className="pb-48 px-20">
      <HeroLoggedIn HighlightedUsers={highlightedUsers} />
      <SectionHeader name="Take Note" />
      <div className="flex items-center gap-2">
        <div className="w-3/4">
          <div className="bg-purple p-10 rounded-5xl my-5 flex flex-col ">
            <h1 className="text-2xl font-bold text-white uppercase mb-3">
              {' '}
              Some High Priority Task
            </h1>
            <div className="flex items-center ">
              <Todo
                title={'Some task'}
                priority={'FIRST'}
                description={'Some top priority task'}
                status={'STARTED'}
                // id={task.id}
                dueDate={new Date('2024-07-14')}
                sessionParticipants={[]}
                taskId={''}
                // dateCompleted={task.dateCompleted}
                userId={''}
              />
              <Todo
                title={'Some task'}
                priority={'FIRST'}
                description={'Some top priority task'}
                status={'STARTED'}
                // id={task.id}
                dueDate={new Date('2024-07-14')}
                sessionParticipants={[]}
                taskId={''}
                // dateCompleted={task.dateCompleted}
                userId={''}
              />
              <Todo
                title={'Some task'}
                priority={'FIRST'}
                description={'Some top priority task'}
                status={'STARTED'}
                // id={task.id}
                dueDate={new Date('2024-07-14')}
                sessionParticipants={[]}
                taskId={''}
                // dateCompleted={task.dateCompleted}
                userId={''}
              />
            </div>
          </div>

          <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col ">
            <h1 className="text-2xl font-bold text-white uppercase">
              {' '}
              Recommended Tribes
            </h1>
            <div className="justify-start items-center gap-2 flex flex-wrap">
              <TribeSnippet
                name="Some tribe"
                desc={'some stuff'}
                tribeId="222"
                userId={'9999'}
                isMember={true}
                members={29}
              />
              <TribeSnippet
                name="Some tribe"
                desc={'some stuff'}
                tribeId="222"
                userId={'9999'}
                isMember={true}
                members={29}
              />
              <TribeSnippet
                name="Some tribe"
                desc={'some stuff'}
                tribeId="222"
                userId={'9999'}
                isMember={true}
                members={29}
              />
            </div>
          </div>
        </div>

        <div className="bg-purple p-5 rounded-5xl my-5 flex flex-col ">
          <h1 className="text-2xl font-bold text-white uppercase mb-3">
            {' '}
            Your Next Session
          </h1>
          <UpcomingSessionDetail
            startDate={'2024-07-14'}
            startTime={'11:00'}
            goal={'Get stuff done'}
            duration={{ hours: '2', minutes: '30' }}
            timeLeft={20}
            isTodayCheck={true}
            isAfter={false}
            meetingLink={''}
            isAdmin={true}
            sessionId={''}
            period={'day'}
            endDate={'2024-07-14'}
            endTime={'13:00:00'}
            isMember={true}
            members={2}
            admin={'Etah'}
            userId={''}
            endDateTime={'2024-07-14T13:00:00.985Z'}
            tasks={[]}
            pageUser={{}}
            sessionParticipantId={''}
          />
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default HomeLoggedIn;
