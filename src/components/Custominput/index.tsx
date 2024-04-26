import React from 'react';
import { CustomInputTypes } from '@/types/types';
import { withFormsy } from 'formsy-react';

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
}: CustomInputTypes) => {
  return (
    <div>
      <div className="shadow-3xl bg-lighterPink rounded-3xl p-px my-4">
        {textArea ? (
          <textarea
            name={name}
            required={required}
            placeholder={placeholder}
            onChange={changeEvent}
            value={value}
            className="bg-transparent p-2 w-full placeholder:text-black focus-within:bg-transparent focus:outline-none"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            onChange={changeEvent}
            value={value}
            className="bg-transparent text-black p-2 w-full placeholder:text-black focus-within:bg-transparent focus:outline-none"
          />
        )}
      </div>
      {isFormSubmitted && !isValid && (
        <p className="text-red-500 font-bold">{errorMessage}</p>
      )}
    </div>
  );
};

export default withFormsy<CustomInputTypes, any>(CustomInput);
