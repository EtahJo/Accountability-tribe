'use client';
import * as z from 'zod';
import { useState, useTransition, useEffect } from 'react';
import ModalWrapper from '@/components/ModalWrap';
import { EditSessionSchema } from '@/schemas/index';
import { Props } from 'react-modal';
import { UpcomingSessionProps } from '@/components/UpcomingSession';
import { Button } from '@/components/ui/button';
import { FaPen, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { isToday } from 'date-fns';

import Formsy from 'formsy-react';
import Custominput from '@/components/CustomInput/index';

import { join_session } from '@/action/join-session';
import { duplicate_session } from '@/action/duplicate-session';
import { edit_session_goal } from '@/action/edit-session-goal';
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
  isTodayCheck,
  isAfter,
  meetingLink,
  isAdmin,
  sessionId,
  userId,
  period,
  endDate,
  endTime,
  isMember,
  members,
  admin,
  endDateTime,
}: // creatorId,
Props & UpcomingSessionProps & UpcomingSessionDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const [editGoal, setEditGoal] = useState(false);
  const [newMeetingLink, setNewMeetingLink] = useState('');
  const [newGoal, setNewGoal] = useState(goal);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user } = useCurrentUser();
  const onGoing = timeLeft < 0 && !isAfter;
  useEffect(() => {}, [isMember]);
  const isEndToday = isToday(endDateTime);

  const onValidSubmit = (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(async () => {
      edit_session_goal(vals, sessionId)
        .then((data) => {
          if (data.success) {
            setError('');
            setSuccess(data.success);
          }
          if (data.error) {
            setSuccess('');
            setError(data.error);
          }
        })
        .catch(() => {
          setSuccess('');
          setError('Something went wrong!');
        });
    });

    // setEditGoal(false);
  };
  const addSession = (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(() => {
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
          setError('Something went wrong');
        });
    });
  };
  const duplicateSession = async (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(() => {
      duplicate_session(vals, sessionId)
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
          setError('Something went wrong');
        });
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
              {isTodayCheck ? 'Today' : startDate} at{' '}
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
                <Button
                  type="button"
                  className="move-button"
                  onClick={() => {
                    setEditGoal(false);
                    setNewGoal(goal);
                  }}
                  disabled={isPending}
                >
                  Done
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
          {!onGoing && !editGoal && isMember && !isAfter && (
            <Button
              className="move-button"
              onClick={() => {
                setError('');
                setSuccess('');
                setEditGoal(true);
              }}
              type="button"
            >
              <FaPen className="text-lightPink" />
            </Button>
          )}
        </div>
        <div className="flex gap-1 flex-wrap">
          <p className="whitespace-nowrap">This Session created by</p>
          {/* TODO:Add link to user profile */}
          <Link href={`/user/${admin}`} className="text-lightPink">
            {isAdmin ? 'you' : admin}
          </Link>

          <p className="whitespace-nowrap">
            has {members} {members > 1 ? ' participants,' : ' participant'}
          </p>
          <p className="font-bold">
            {' '}
            {isMember && !isAdmin && 'including you'}
          </p>
        </div>
        <div className="flex flex-col gap-y-4">
          {/* 
          TODO: Duplicate Session not admin
          <Button>
            <Link href={`/edit-session/${sessionId}`}>Duplicate Session</Link>
          </Button> */}
          {isEndToday && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className="move-button py-3 bg-lightPink" size={'slg'}>
                  Duplicate Session For Tomorrow
                </Button>
              </PopoverTrigger>
              <PopoverContent className="z-[150] w-[310px]">
                <Formsy
                  className="flex flex-col justify-center"
                  onValidSubmit={duplicateSession}
                >
                  <Custominput
                    textArea
                    placeholder="Add your new goal"
                    name="goal"
                    value={newGoal}
                    changeEvent={(e) => {
                      setNewGoal(e.target.value);
                    }}
                    disabled={isPending}
                  />
                  <Custominput
                    textArea
                    placeholder="Add new meeting link"
                    required
                    name="meetingLink"
                    value={newMeetingLink}
                    changeEvent={(e) => {
                      setNewMeetingLink(e.target.value);
                    }}
                    disabled={isPending}
                  />
                  {error && <FormError message={error} />}
                  {success && <FormSuccess message={success} />}
                  <Button
                    className="move-button"
                    type="submit"
                    disabled={isPending}
                  >
                    Done
                  </Button>
                </Formsy>
              </PopoverContent>
            </Popover>
          )}

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
                    <Button
                      size={'slg'}
                      className="py-3 move-button"
                      disabled={isPending}
                    >
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
                        disabled={isPending}
                      />
                      {error && <FormError message={error} />}
                      {success && <FormSuccess message={success} />}
                      <Button
                        className="move-button"
                        type="submit"
                        disabled={isPending}
                      >
                        Done
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
