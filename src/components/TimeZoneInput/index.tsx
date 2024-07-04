'use client';
import { withFormsy } from 'formsy-react';
import { useTimezoneSelect, allTimezones } from 'react-timezone-select';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';

interface TimeZoneInputProps {
  value: string;
  onChange: (val: string) => void;
}
const timezones = {
  ...allTimezones,
};

const TimeZoneInput = ({ value, onChange }: TimeZoneInputProps) => {
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: 'original',
    timezones,
  });
  return (
    <Select onValueChange={(e) => onChange(e)} defaultValue={value}>
      <SelectTrigger className="shadow-3xl bg-lighterPink  mt-5 rounded-5xl border-none py-5">
        <SelectValue placeholder="Please Select your Timezone" />
      </SelectTrigger>
      <SelectContent className="w-[300px]">
        {options.map((option, index) => (
          <SelectItem value={parseTimezone(option.value).value} key={index}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default withFormsy(TimeZoneInput);
