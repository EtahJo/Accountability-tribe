'use client';
import React from 'react';
import { withFormsy } from 'formsy-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from '@/lib/utils';

interface CustomDateTimeInputProps {
  startDateTime: any;
  endDateTime: any;
  disabled: boolean;
  className?: string;
  onChangeStart: (val: any) => void;
  onChangeEnd: (val: any) => void;
}
const CustomDateTimeInput = ({
  startDateTime,
  endDateTime,
  onChangeStart,
  onChangeEnd,
  disabled,
  className,
}: CustomDateTimeInputProps) => {
  return (
    <div className="gap-x-2 w-full relative">
      <DatePicker
        selected={startDateTime}
        showTimeSelect
        disabled={disabled}
        startDate={startDateTime}
        endDate={endDateTime}
        onChange={onChangeStart}
        value={startDateTime}
        selectsStart
        dateFormat={'Pp'}
        className={cn(
          'p-2 bg-lighterPink rounded-5xl my-2  mr-3 placeholder:text-black placeholder:text-sm shadow-3xl ',
          className
        )}
        placeholderText="Start Date and Time"
      />
      <DatePicker
        selected={endDateTime}
        onChange={onChangeEnd}
        selectsEnd
        disabled={disabled}
        value={endDateTime}
        startDate={startDateTime}
        endDate={endDateTime}
        minDate={startDateTime}
        showTimeSelect
        dateFormat="Pp"
        className={cn(
          'p-2 bg-lighterPink rounded-5xl my-2  placeholder:text-black placeholder:text-sm shadow-3xl ',
          className
        )}
        placeholderText="End Date and Time"
      />
    </div>
  );
};

export default withFormsy(CustomDateTimeInput);
