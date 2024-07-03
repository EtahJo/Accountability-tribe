'use client';

import React, { useState, useTransition } from 'react';
import * as z from 'zod';

import CustomInput from '@/components/CustomInput/index';
import CustomDateInput from '@/components/CustomDateInput';
import { create_session } from '@/action/create-session';
import { CreateSessionSchema } from '@/schemas/index';
import { FaLink, FaCalendar, FaBaseballBall } from 'react-icons/fa';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import Duration from '@/components/DurationInput/index';
import { getDuration } from '@/util/DateTime';
import { addHours, subHours, addMinutes, subMinutes } from 'date-fns';
import { useCurrentUser } from '@/hooks/use-current-user';
import Formsy from 'formsy-react';
import { Button } from '@/components/ui/button';
import CustomTagsInput from '@/components/CustomTagsInput';

interface CreateSessionFormprops {
  tasks: {}[];
}

const CreateSessionForm = ({ tasks }: CreateSessionFormprops) => {
  const { user } = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [goal, setGoal] = useState('');
  const [startDateTime, setStartDateTime] = useState<Date>();
  const [endDateTime, setEndDateTime] = useState<Date>();
  const [meetingLink, setMeetingLink] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [taskIds, setTaskIds] = useState(new Set());
  const [taskSet, setTaskSet] = useState(new Set());

  const addTask = (taskId: any) => {
    setTaskIds(new Set(taskIds).add(taskId));
  };
  const handleRemove = (item: any) => {
    const newItems = new Set(taskIds);
    newItems.delete(item);
    setTaskIds(newItems);
  };
  const taskIdArray = Array.from(taskIds);
  const onValidSubmit = async (vals: z.infer<typeof CreateSessionSchema>) => {
    startTransition(async () => {
      create_session(vals)
        .then((data) => {
          if (data.error) {
            setSuccess('');
            setError(data.error);
          }
          if (data.success) {
            setError('');
            setSuccess(data.success);
          }
        })
        .catch((error) => {
          setSuccess('');
          setError('Something went wrong');
        });
    });
  };
  return (
    <Formsy
      className="flex justify-center flex-col items-center"
      onValidSubmit={onValidSubmit}
    >
      <div className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-10  md:w-[600px] w-[310px] ">
        <CustomInput
          lable="Session Goal"
          labelIcon={<FaBaseballBall className="text-purple" />}
          name="goal"
          value={goal}
          required
          textArea
          disabled={isPending}
          placeholder="What is the goal for this session ?"
          changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGoal((e.target as HTMLInputElement).value);
          }}
        />
        <CustomInput
          lable="Link to Scheduled Meeting"
          labelIcon={<FaLink className="text-purple" />}
          name="meetingLink"
          value={meetingLink}
          required
          disabled={isPending}
          changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMeetingLink((e.target as HTMLInputElement).value);
          }}
          placeholder="Add link to meeting"
        />
        <CustomTagsInput
          name="taskIds"
          lable="Select Tasks to Accomplish"
          availableTags={tasks}
          addTag={addTask}
          handleRemoveFxn={handleRemove}
          value={taskIdArray}
        />
      </div>
      <div
        className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-5 relative  flex justify-center 
           md:w-[600px] w-[310px] flex-col gap-5 "
      >
        {endDateTime && startDateTime && (
          <Duration
            startDateTime={startDateTime.toISOString()}
            endDateTime={endDateTime.toISOString()}
            name="duration"
            hours={hours}
            minutes={minutes}
            changeHour={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError('');
              setHours(parseInt((e.target as HTMLInputElement).value, 10));
              const newHour = parseInt(
                (e.target as HTMLInputElement).value,
                10
              );
              const duration = getDuration(
                startDateTime.toISOString(),
                endDateTime.toISOString()
              ).hm;
              if (isNaN(newHour)) {
                // setError('Please Enter Number for Duration');
                return;
              } else {
                const hours =
                  typeof duration.hours === 'string'
                    ? parseInt(duration.hours, 10)
                    : duration.hours;

                if (newHour >= duration.hours) {
                  const hourDifference = newHour - hours;
                  setEndDateTime(addHours(endDateTime, hourDifference));
                } else {
                  const hoursToSubtract = hours - newHour;
                  setEndDateTime(subHours(endDateTime, hoursToSubtract));
                }
              }
            }}
            changeMinutes={(e: React.ChangeEvent<HTMLInputElement>) => {
              setError('');
              setMinutes(parseInt((e.target as HTMLInputElement).value, 10));
              const newMinutes = parseInt(
                (e.target as HTMLInputElement).value,
                10
              );
              const duration = getDuration(
                startDateTime.toISOString(),
                endDateTime.toISOString()
              ).hm;

              if (isNaN(newMinutes)) {
                // setError('Please Enter Number for Duration');
                return;
              } else {
                const minutes =
                  typeof duration.minutes === 'string'
                    ? parseInt(duration.minutes, 10)
                    : duration.minutes;

                if (newMinutes >= duration.minutes) {
                  const minutesDifference = newMinutes - minutes;
                  setEndDateTime(addMinutes(endDateTime, minutesDifference));
                } else {
                  const minutesToSubtract = minutes - newMinutes;
                  setEndDateTime(subMinutes(endDateTime, minutesToSubtract));
                }
              }
            }}
          />
        )}

        <CustomDateInput
          lable="Start and End Date and Time"
          labelIcon={<FaCalendar className="text-purple" />}
          className="w-[250px]"
          required
          name="startEndDateTime"
          value={{ startDateTime, endDateTime }}
          startDateTime={startDateTime}
          endDateTime={endDateTime}
          disabled={isPending}
          onChangeStart={(date) => {
            setStartDateTime(date);
          }}
          onChangeEnd={(date) => {
            setEndDateTime(date);
          }}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <div className="flex justify-center mt-5">
          <Button
            type="submit"
            className="rounded-3xl"
            disabled={isPending}
            size="lg"
            variant={'primary'}
          >
            Create Session
          </Button>
        </div>
      </div>
    </Formsy>
  );
};

export default CreateSessionForm;
