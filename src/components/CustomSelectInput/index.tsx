'use client';

import { withFormsy, FormsyInjectedProps } from 'formsy-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InputLabel, { InputLabelProps } from '@/components/InputLabel/index';

export interface CustomSelectInputProps {
  placeholder: string;
  items: {
    title: string;
    id: any;
  }[];
  onValueChange: any;
  disabled?: boolean;
  value?: any;
}

const CustomSelectInput = ({
  placeholder,
  items,
  lable,
  labelIcon,
  required,
  onValueChange,
  disabled,
  value,
}: InputLabelProps & CustomSelectInputProps) => {
  return (
    <div className="max-[538px]:w-[200px] ">
      {lable && (
        <InputLabel lable={lable} labelIcon={labelIcon} required={required} />
      )}
      <Select onValueChange={onValueChange} disabled={disabled} value={value}>
        <SelectTrigger className="shadow-3xl bg-lighterPink rounded-3xl p-2 my-4 flex align-middle border-none placeholder:text-gray-400">
          <SelectValue
            placeholder={placeholder}
            className="placeholder:text-gray-400"
          />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.id} key={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelectInput;
