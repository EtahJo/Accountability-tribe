'use client';
import { useState, useTransition, useEffect } from 'react';
import ModalWrapper from '@/components/ModalWrap';
import { Props } from 'react-modal';
import { UpcomingSessionProps } from '@/components/UpcomingSession';
import { Button } from '@/components/ui/button';
import { FaPen, FaClock } from 'react-icons/fa';
import Link from 'next/link';

import Formsy from 'formsy-react';
import Custominput from '@/components/CustomInput/index';
import { get_user_by_id } from '@/action/get-user';
import { get_session_participants } from '@/action/get-session-participants';
import { join_session, is_member } from '@/action/join-session';
import { isParticipant } from '@/util/Check';
import { edit_session } from '@/action/edit-session';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
interface UpcomingSessionDetailProps {
  period: string;
  upcomingSessionChildren?: React.ReactNode;
}
const UpcomingSessionDetail = ({
  isOpen,
  onRequestClose,
  startDate,
  startTime,
  goal,
  duration,
  timeLeft,
  isToday,
  isAfter,
  meetingLink,
  isAdmin,
  sessionId,
  period,
  endDate,
  endTime,
  isMember,
  members,
  admin,
}: // creatorId,
Props & UpcomingSessionProps & UpcomingSessionDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const [editGoal, setEditGoal] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useCurrentUser();
  const onGoing = timeLeft < 0 && !isAfter;
  useEffect(() => {}, [goal, members]);

  const onValidSubmit = (vals: any) => {
    // startTransition(() => {
    //   edit_session(vals, sessionId)
    //     .then((data) => {
    //       if (data.success) {
    //         setError('');
    //         setSuccess(data.success);
    //       }
    //       if (data.error) {
    //         setSuccess('');
    //         setError(data.error);
    //       }
    //     })
    //     .catch(() => {
    //       setSuccess('');
    //       setError('Something went wrong!');
    //     });
    // });
    // setEditGoal(false);
  };
  const addSession = (vals: any) => {
    join_session(vals, sessionId, user?.id as string)
      .then((data) => {
        if (data?.error) {
          setSuccess('');
          setError(data.error);
        }
        if (data?.success) {
          setError('');
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setSuccess('');
        setError('Somethin went wrong');
      });
  };
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Session Details"
      className={'  bg-white w-[450px] '}
      onAfterOpen={() => setEditGoal(false)}
    >
      <div className="flex flex-col gap-y-6">
        <div className="bg-purple rounded-2xl px-5 py-2 text-xl font-bold text-white ">
          {isAfter && <p className="text-center">This Session has ended</p>}
          {onGoing && (
            <p className="text-center animate-zoom">This Session is Ongoing</p>
          )}
          {period === 'day' && !isAfter && !onGoing && (
            <div className="flex gap-2 justify-center">
              <p>Sessions starts in </p>
              <p className="text-lightPink animate-zoom">{timeLeft} minutes</p>
            </div>
          )}
          {period === 'week' && !onGoing && !isAfter && (
            <p className="text-center flex gap-x-2 justify-center">
              {isToday ? 'Today' : startDate} at{' '}
              <p className="animate-zoom text-lightPink">{startTime}</p>
            </p>
          )}
        </div>
        <div className="flex justify-between mx-4">
          <div className="flex items-start gap-2">
            <p className="font-bold">Start:</p>
            <span>
              <p>{startDate}</p>
              <p>{startTime}</p>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <p className="font-bold">End:</p>
            <span>
              <p>{endDate}</p>
              <p>{endTime}</p>
            </span>
          </div>
        </div>
        <span className="flex items-center gap-1 mx-4">
          <FaClock className="text-purple" />
          <p className="font-bold">Duration:</p>
          <p className="  rounded-md px-2 py-px bg-lightPink">
            {duration.hours !== '00' && duration.hours + 'h '}
            {duration.minutes !== '00' && duration.minutes + 'm'}
          </p>
        </span>
        <div className="bg-lighterPink p-5 rounded-2xl flex justify-between items-center">
          <div>
            {editGoal ? (
              <Formsy
                className="flex flex-col gap-y-2"
                onValidSubmit={onValidSubmit}
              >
                <Custominput
                  textArea
                  name="goal"
                  value={newGoal}
                  placeholder="What's your new goal?"
                  changeEvent={(e) => setNewGoal(e.target.value)}
                  className="w-[300px]"
                  disabled={isPending}
                />
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button
                  type="submit"
                  className="move-button"
                  disabled={isPending}
                >
                  Update
                </Button>
              </Formsy>
            ) : (
              <>
                <div className=" justify-center ">
                  <h1 className="text-2xl font-bold -mr-4">Goal</h1>
                </div>

                <p>{goal}</p>
              </>
            )}
          </div>
          {!onGoing && !editGoal && isMember && (
            <Button
              className="move-button"
              onClick={() => setEditGoal(true)}
              type="button"
            >
              <FaPen className="text-lightPink" />
            </Button>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <p>This Session created by</p>
          {/* TODO:Add link to user profile */}
          <Link href={`/user/${admin}`} className="text-lightPink">
            {admin}
          </Link>
          <p>
            has {members}
            {members > 1 ? ' participants' : ' participant'}
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* 
          TODO: Duplicate Session not admin
          <Button>
            <Link href={`/edit-session/${sessionId}`}>Duplicate Session</Link>
          </Button> */}

          <Button className="move-button py-3 bg-lightPink" size={'slg'}>
            Duplicate Session
          </Button>
          {isMember ? (
            <>
              {onGoing && (
                <Button size={'slg'} className="py-3 move-button">
                  <Link href={meetingLink}>Join</Link>
                </Button>
              )}
              {timeLeft > 2 && !isAfter && isAdmin && (
                <Button className="move-button py-3" size={'slg'}>
                  <Link href={`/edit-session/${sessionId}`}>Edit</Link>
                </Button>
              )}
            </>
          ) : (
            <>
              {!isAfter && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size={'slg'} className="py-3 move-button">
                      Add Session
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-[150] w-[310px]">
                    <Formsy
                      className="flex flex-col justify-center"
                      onValidSubmit={addSession}
                    >
                      <Custominput
                        textArea
                        placeholder="Add your own goal"
                        name="goal"
                        value={newGoal}
                        changeEvent={(e) => {
                          setNewGoal(e.target.value);
                        }}
                      />
                      {error && <FormError message={error} />}
                      {success && <FormSuccess message={success} />}
                      <Button className="move-button" type="submit">
                        Add Goal
                      </Button>
                    </Formsy>
                  </PopoverContent>
                </Popover>
              )}
            </>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UpcomingSessionDetail;
