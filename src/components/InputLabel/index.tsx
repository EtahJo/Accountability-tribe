import React from 'react';
export interface InputLabelProps {
  lable?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
}
const InputLabel = ({ lable, labelIcon, required }: InputLabelProps) => {
  return (
    <div className="flex items-center gap-1">
      {labelIcon && labelIcon}
      <span className="flex">
        <h1 className="font-bold">{lable}</h1>
        {required && <p className="text-red-500">*</p>}
      </span>
    </div>
  );
};

export default InputLabel;
