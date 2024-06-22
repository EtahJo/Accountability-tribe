'use client';
import { useEffect, useState } from 'react';
import { getDuration } from '@/util/DateTime';
import { FaClock } from 'react-icons/fa';

interface DurationProps {
  startDateTime: string;
  endDateTime: string;
}
interface DurationStateProps {
  hours: string | number;
  minutes: string | number;
}
const Duration = ({ startDateTime, endDateTime }: DurationProps) => {
  const [duration, setDuration] = useState<DurationStateProps>({
    hours: '' || 0,
    minutes: '' || 0,
  });
  useEffect(() => {
    const duration = getDuration(startDateTime, endDateTime);
    console.log(duration);
    setDuration({ ...duration.hm });
  }, [startDateTime, endDateTime]);

  return (
    <div>
      <div className="flex items-center gap-2 justify-center">
        <p className=" font-extrabold text-4xl text-shadow-md">Duration</p>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div
          className="flex bg-purple rounded-2xl p-2 flex-col 
     text-white font-bold shadow-3xl align-middle my-4"
        >
          <p className="text-5xl text-center">{duration?.hours}</p>
          <p className="text-xl"> Hours</p>
        </div>
        <div
          className="flex bg-lightPink rounded-2xl p-2 flex-col 
     text-black font-bold shadow-3xl align-middle my-4"
        >
          <p className="text-5xl text-center">{duration.minutes}</p>
          <p> Minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Duration;
