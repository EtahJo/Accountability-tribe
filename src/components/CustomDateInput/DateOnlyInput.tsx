'use client';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { withFormsy, FormsyInjectedProps } from 'formsy-react';
import InputLabel, { InputLabelProps } from '@/components/InputLabel/index';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addDays } from 'date-fns';

interface DateOnlyInputProps {
  date: Date;
  setDate: any;
  disabled: boolean;
}
const DateOnlyInput = ({
  date,
  setDate,
  name,
  lable,
  required,
  labelIcon,
  disabled,
}: FormsyInjectedProps<any> & InputLabelProps & DateOnlyInputProps) => {
  return (
    <div>
      {lable && (
        <InputLabel lable={lable} labelIcon={labelIcon} required={required} />
      )}
      <Popover>
        <PopoverTrigger
          disabled={disabled}
          asChild
          className="shadow-3xl bg-lighterPink rounded-3xl p-2 my-4 flex align-middle border-none placeholder:text-gray-400 max-[538px]:w-[200px] "
        >
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default withFormsy(DateOnlyInput);
