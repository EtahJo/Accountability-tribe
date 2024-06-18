import React from 'react';
import { CustomInputTypes } from '@/types/types';
import { withFormsy } from 'formsy-react';
import { Input } from '@/components/ui/input';

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
}: CustomInputTypes) => {
  return (
    <div>
      <div className="shadow-3xl bg-lighterPink rounded-3xl p-px my-4 flex align-middle">
        {textArea ? (
          <textarea
            name={name}
            required={required}
            placeholder={placeholder}
            onChange={changeEvent}
            value={value}
            autoComplete="off"
            disabled={disabled}
            className="bg-transparent p-2 w-full placeholder:text-black focus-within:bg-transparent focus:outline-none"
          />
        ) : (
          <Input
            autoComplete="off"
            // type={type}
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
