import React from 'react';
import { CustomInputTypes } from '@/types/types';
import { withFormsy } from 'formsy-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputLabel, { InputLabelProps } from '../InputLabel/index';
import { cn } from '@/lib/utils';

const CustomInput = ({
  name,
  type,
  placeholder,
  textArea,
  required,
  changeEvent,
  value,
  errorMessage,
  isFormSubmitted,
  isValid,
  Icon,
  disabled,
  lable,
  className,
  labelIcon,
}: CustomInputTypes & InputLabelProps) => {
  return (
    <div>
      {lable && (
        <InputLabel lable={lable} labelIcon={labelIcon} required={required} />
      )}
      <div className="shadow-3xl bg-lighterPink rounded-3xl p-px my-4 flex align-middle">
        {textArea ? (
          <Textarea
            name={name}
            required={required}
            placeholder={placeholder}
            onChange={changeEvent}
            value={value}
            autoComplete="off"
            disabled={disabled}
            className={cn(
              'bg-transparent px-5 py-2 w-full placeholder:text-black focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none',
              className
            )}
          />
        ) : (
          <Input
            autoComplete="off"
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            onChange={changeEvent}
            value={value}
            ng-name={name}
            className=""
            disabled={disabled}
          />
        )}
        {Icon && (
          <div className="place-content-center cursor-pointer">{Icon}</div>
        )}
      </div>
      {isFormSubmitted && !isValid && (
        <p className="text-red-500 font-bold">{errorMessage}</p>
      )}
    </div>
  );
};

export default withFormsy<CustomInputTypes, any>(CustomInput);
