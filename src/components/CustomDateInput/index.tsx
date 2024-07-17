'use client';
import React from 'react';
import { withFormsy } from 'formsy-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';
import '@/styles/custom-datepicker.css';

import InputLabel, { InputLabelProps } from '@/components/InputLabel/index';

interface CustomDateTimeInputProps {
  startDateTime: any;
  endDateTime: any;
  disabled: boolean;
  className?: string;
  required?: boolean;
  onChangeStart: (val: any) => void;
  onChangeEnd: (val: any) => void;
  onInputBlur?: () => void;
}
const CustomDateTimeInput = ({
  startDateTime,
  endDateTime,
  onChangeStart,
  onChangeEnd,
  disabled,
  className,
  lable,
  labelIcon,
  required,
  onInputBlur,
}: CustomDateTimeInputProps & InputLabelProps) => {
  const today = new Date();
  const isToday = startDateTime
    ? startDateTime.toDateString() === today.toDateString()
    : false;

  const minTime = isToday ? today : new Date(0, 0, 0, 0, 0, 0, 0);
  const maxTime = new Date(0, 0, 0, 23, 59, 59, 999);
  return (
    <div>
      {lable && (
        <InputLabel lable={lable} labelIcon={labelIcon} required={required} />
      )}
      <div className="gap-x-2 w-full relative">
        <DatePicker
          selected={startDateTime}
          showTimeSelect
          disabled={disabled}
          startDate={startDateTime}
          endDate={endDateTime}
          required={required}
          minTime={minTime}
          maxTime={maxTime}
          onChange={onChangeStart}
          value={startDateTime}
          selectsStart
          minDate={today}
          dateFormat={'Pp'}
          calendarClassName=" !flex !flex-nowrap !border-2 !border-purple !shadow-3xl"
          className={cn(
            'p-2 bg-lighterPink rounded-5xl my-2 mr-2 placeholder:text-black placeholder:text-sm shadow-3xl',
            className
          )}
          placeholderText="Start Date and Time"
        />
        <DatePicker
          selected={endDateTime}
          onChange={onChangeEnd}
          selectsEnd
          required={required}
          disabled={disabled}
          value={endDateTime}
          minTime={startDateTime}
          maxTime={maxTime}
          startDate={startDateTime}
          endDate={endDateTime}
          minDate={startDateTime}
          showTimeSelect
          // onBlur={onInputBlur}
          onSelect={onInputBlur}
          dateFormat="Pp"
          calendarClassName=" !flex !flex-nowrap !border-2 !border-purple !shadow-3xl select:bg-purple"
          className={cn(
            'p-2 bg-lighterPink rounded-5xl my-2  placeholder:text-black placeholder:text-sm shadow-3xl ',
            className
          )}
          placeholderText="End Date and Time"
        />
      </div>
    </div>
  );
};

export default withFormsy(CustomDateTimeInput);
