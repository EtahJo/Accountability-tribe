'use client';
import { useEffect, useState } from 'react';
import { getDuration } from '@/util/DateTime';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { withFormsy, FormsyInjectedProps } from 'formsy-react';
import { addHours } from 'date-fns';

interface DurationProps {
  startDateTime: string;
  endDateTime: string;
  name: string;
  type?: string;
  required?: boolean;
  changeHour: (val: React.ChangeEvent<HTMLInputElement>) => void;
  changeMinutes: (val: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  hours?: number;
  minutes?: number;
}
interface DurationStateProps {
  hours: string | number;
  minutes: string | number;
}
const DurationInput = ({
  startDateTime,
  endDateTime,
  name,
  type,
  required,
  changeHour,
  changeMinutes,
  disabled,
  value,
  hours,
  minutes,
}: DurationProps & FormsyInjectedProps<any>) => {
  const [compDuration, setCompDuration] = useState<DurationStateProps>({
    hours: '' || 0,
    minutes: '' || 0,
  });
  useEffect(() => {
    const duration = getDuration(startDateTime, endDateTime);
    setCompDuration({ ...duration.hm });
  }, [startDateTime, endDateTime, hours]);

  return (
    <div>
      <div className="flex items-center gap-2 justify-center">
        <p className=" font-extrabold text-4xl text-shadow-md">Duration</p>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <div
          className="flex bg-purple rounded-2xl p-2 flex-col 
     text-white font-bold shadow-3xl align-middle my-4 w-[150px] appearance-none"
        >
          <Input
            className="text-5xl h-14 shadow-none custom-spin-buttons"
            name={name}
            type={'number'}
            value={hours || compDuration.hours}
            required={required}
            onChange={changeHour}
            disabled={disabled}
            min="0"
          />
          <p className="text-xl ml-3 font-normal ">Hours</p>
        </div>
        <div
          className="flex bg-lightPink rounded-2xl p-2 flex-col 
     text-black font-bold shadow-3xl align-middle my-4 w-[150px]"
        >
          <Input
            className="text-5xl h-14 shadow-none text-center custom-spin-buttons"
            name={name}
            type={'number'}
            value={minutes || compDuration.minutes}
            required={required}
            onChange={changeMinutes}
            disabled={disabled}
            min="0"
            max="59"
          />

          <p className="ml-5"> Minutes</p>
        </div>
      </div>
    </div>
  );
};

export default withFormsy<DurationProps, any>(DurationInput);
