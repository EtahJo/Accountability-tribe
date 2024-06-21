'use client';

import React, { useTransition, useState } from 'react';
import * as z from 'zod';
import Formsy from 'formsy-react';

import { create_session } from '@/action/create-session';
import { CreateSessionSchema } from '@/schemas/index';
import Custominput from '@/components/Custominput/index';
import CustomDateInput from '@/components/CustomDateInput';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/SectionHeader';
import InputLabel from '@/components/InputLabel/index';
import { FaLink, FaCalendar, FaBaseballBall } from 'react-icons/fa';

const CreateSession = () => {
  const [isPending, startTransition] = useTransition();
  const [goal, setGoal] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [meetingLink, setMeetingLink] = useState('');

  const onValidSubmit = (vals: z.infer<typeof CreateSessionSchema>) => {
    console.log(vals);
    startTransition(() => {
      create_session(vals)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }
          if (data.success) {
            console.log(data.success);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Create A Session" />
        </div>

        <Formsy
          onValidSubmit={onValidSubmit}
          className="flex justify-center flex-col items-center"
        >
          <div className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-10  md:w-[600px] w-[320px] ">
            <InputLabel
              label="Session Goal"
              labelIcon={<FaBaseballBall className="text-purple" />}
            />
            <Custominput
              name="goal"
              value={goal}
              textArea
              disabled={isPending}
              placeholder="What is the goal for this session ?"
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setGoal((e.target as HTMLInputElement).value);
              }}
            />
            <Custominput
              name="meetingLink"
              value={meetingLink}
              disabled={isPending}
              changeEvent={(e: React.ChangeEvent<HTMLInputElement>) => {
                setMeetingLink((e.target as HTMLInputElement).value);
              }}
              placeholder="Add link to meeting"
            />
          </div>
          <div className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-10 relative  flex justify-center  md:w-[600px] w-[320px] ">
            <CustomDateInput
              className="w-[250px]"
              name="startEndDateTime"
              value={{ startDateTime, endDateTime }}
              startDateTime={startDateTime}
              endDateTime={endDateTime}
              disabled={isPending}
              onChangeStart={(date) => {
                setStartDateTime(date);
              }}
              onChangeEnd={(date) => setEndDateTime(date)}
            />
          </div>

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
        </Formsy>
      </div>
    </div>
  );
};

export default CreateSession;
