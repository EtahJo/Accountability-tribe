import React from 'react';
import { CustomCheckboxProps } from '@/types/types';
import { withFormsy } from 'formsy-react';

const CustomCheckbox = ({ label, checked, onChange }: CustomCheckboxProps) => {
  return (
    <div className="flex bg-white">
      <label className="font-bold cursor-pointer relative  text-lg phone:text-xl">
        <input
          type={'checkbox'}
          defaultChecked={checked}
          onChange={onChange}
          className="w-0 h-0 opacity-0 absolute peer"
        />
        <span className="border-4 w-8 h-8 bg-transparent border-black absolute rounded-lg top-0 left-0" />
        <span className="bg-lightPink rounded-full w-5 h-5 absolute z-20 top-1.5 left-1.5 hidden peer-checked:block" />
        <span className="ml-10">{label}</span>
      </label>
    </div>
  );
};

export default withFormsy(CustomCheckbox);
