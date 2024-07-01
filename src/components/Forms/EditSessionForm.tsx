'use client';
import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';
import Formsy from 'formsy-react';

import CustomInput from '@/components/CustomInput/index';
import DurationInput from '@/components/DurationInput';
import CustomDateInput from '@/components/CustomDateInput';
import { FormError } from '@/components/Messages/Error';
import { FormSuccess } from '@/components/Messages/Success';
import { Button } from '@/components/ui/button';
import { edit_session } from '@/action/edit-session';

import { FaBaseballBall, FaLink, FaCalendar } from 'react-icons/fa';
import { getDuration } from '@/util/DateTime';
import { EditSessionSchema } from '@/schemas/index';
import { addHours, subHours, addMinutes, subMinutes } from 'date-fns';

interface EditSessionProps {
  session: {
    id: string;
    goal: string;
    startDateTime: Date;
    endDateTime: Date | null;
    meetingLink: string;
    duration: string | null;
  } | null;
}
const EditSessionForm = ({ session }: EditSessionProps) => {
  const [isPending, startTransition] = useTransition();
  const [goal, setGoal] = useState(session?.goal || undefined);
  const [startDateTime, setStartDateTime] = useState<Date>(
    new Date(session?.startDateTime as Date) || undefined
  );
  const [endDateTime, setEndDateTime] = useState<Date>(
    new Date(session?.endDateTime as Date) || undefined
  );
  const [meetingLink, setMeetingLink] = useState(
    session?.meetingLink || undefined
  );
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onValidSubmit = (vals: z.infer<typeof EditSessionSchema>) => {
    startTransition(() => {
      edit_session(vals, session?.id as string)
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
      onValidSubmit={onValidSubmit}
      className="flex justify-center flex-col items-center"
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
      </div>
      <div
        className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-5 relative  flex justify-center 
   md:w-[600px] w-[310px] flex-col gap-5 "
      >
        {endDateTime && startDateTime && (
          <DurationInput
            startDateTime={startDateTime?.toISOString()}
            endDateTime={endDateTime?.toISOString()}
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
      </div>

      <div className="flex justify-center mt-5">
        <Button
          type="submit"
          className="rounded-3xl"
          disabled={isPending}
          size="lg"
          variant={'primary'}
        >
          Edit Session
        </Button>
      </div>
    </Formsy>
  );
};

export default EditSessionForm;
