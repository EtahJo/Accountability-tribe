'use client';
import * as z from 'zod';
import { useState, useTransition, useEffect } from 'react';
import { EditSessionSchema } from '@/schemas/index';
import { UpcomingSessionProps } from '@/components/UpcomingSession';
import { Button } from '@/components/ui/button';
import { FaPen, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { isToday } from 'date-fns';
import { toast } from 'sonner';

import Formsy from 'formsy-react';
import Custominput from '@/components/CustomInput/index';
import SelectTasks from '@/components/CustomMultipleSelectInput/SelectTasks';

import { join_session } from '@/action/session/join-session';
import { duplicate_session } from '@/action/session/duplicate-session';
import { edit_session_goal } from '@/action/session/edit-session-goal';
import { link_task_session } from '@/action/task/link-task-to-session';
import { delete_session } from '@/action/session/delete-session';
import { leave_session } from '@/action/session/leave-session';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Todo from '@/components/TodoList/Todo';
import DeleteConfirmation from '@/components/Confirmations/DeleteConfirmation';

interface UpcomingSessionDetailProps {
  period: string;
  upcomingSessionChildren?: React.ReactNode;
  tasks?: {}[];
  pageUser?: { tasks: {}[] };
  sessionParticipantId: string;
}
const UpcomingSessionDetail = ({
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
  tasks, // tasks already part of the session
  pageUser, // the user profile we are looking at
  sessionParticipantId,
}: // creatorId,
UpcomingSessionProps & UpcomingSessionDetailProps) => {
  const [isPending, startTransition] = useTransition();
  const [editGoal, setEditGoal] = useState(false);
  const [newMeetingLink, setNewMeetingLink] = useState('');
  const [newGoal, setNewGoal] = useState(goal);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { user }: any = useCurrentUser();
  const onGoing = timeLeft < 0 && !isAfter;
  useEffect(() => {}, [isMember]);
  const isEndToday = isToday(endDateTime);

  const taskGoodToAdd = user.tasks.filter(
    (task: {}) =>
      !tasks?.some((task1) => {
        return task.id === task1.taskId;
      })
  );
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
  const addTaskToSession = async (vals: any) => {
    startTransition(() => {
      vals.taskIds.map((task: any) =>
        link_task_session(sessionParticipantId, task.value).then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
          }
        })
      );
    });
  };
  const deleteSession = () => {
    delete_session(sessionId).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  const leaveSession = () => {
    leave_session(sessionId).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };
  return (
    <div className="bg-white p-5 rounded-3xl shadow-3xl ">
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
      <div className="flex items-center gap-4 ">
        <div>
          <div className="flex flex-col gap-y-6 p-4 border-purple border-2 rounded-3xl my-2">
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
                      <h1 className="text-2xl font-bold -mr-4">Title</h1>
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

            <div className="flex gap-x-2 flex-wrap -mt-5 ml-2 ">
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
              {isEndToday && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="move-button py-3 bg-lightPink"
                      size={'slg'}
                    >
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
                        disabled={isPending}
                      />
                      <SelectTasks
                        name="taskIds"
                        options={
                          pageUser?.tasks as { id: string; title: string }[]
                        }
                      />
                      <Custominput
                        placeholder="Add new meeting link"
                        required
                        name="meetingLink"
                        value={newMeetingLink}
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
                            disabled={isPending}
                          />
                          <SelectTasks
                            lable="Add Tasks"
                            name="taskIds"
                            options={
                              user.tasks as { id: string; title: string }[]
                            }
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
          <div>
            {(isAfter || members === 1) && isAdmin ? (
              <DeleteConfirmation
                trigger={
                  <Button variant={'destructive'}>Delete Session</Button>
                }
                confirmationMessage="Are you sure you want to delete Session"
                consequenceMessage="This action will prevent any notifications about session detail changes or updates"
                action={
                  <Button variant={'destructive'} onClick={deleteSession}>
                    Delete Anyway
                  </Button>
                }
              />
            ) : (
              isMember && (
                <DeleteConfirmation
                  trigger={<Button variant={'secondary'}>Leave Session</Button>}
                  confirmationMessage="Are you sure you want to leave Session"
                  consequenceMessage="This action will prevent any notifications about session detail changes or updates"
                  action={
                    <Button variant={'destructive'} onClick={leaveSession}>
                      Leave Anyway
                    </Button>
                  }
                />
              )
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          {tasks?.map(({ task }: any) => (
            <Todo
              key={task.id}
              title={task.title}
              priority={task.priority}
              description={task.description}
              status={task.status}
              id={task.id}
              dueDate={task.dueDate}
              sessionParticipants={task.sessionParticipants}
              taskId={task.id}
            />
          ))}
          {isMember && !isAfter && pageUser.username === user.username && (
            <Formsy onValidSubmit={addTaskToSession}>
              <div className="w-[300px]">
                <SelectTasks
                  name="taskIds"
                  options={taskGoodToAdd as { id: string; title: string }[]}
                />
              </div>

              <Button
                type="submit"
                size={'slg'}
                className="py-2"
                disabled={isPending}
              >
                Add Tasks
              </Button>
            </Formsy>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionDetail;
