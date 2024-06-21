import React from 'react';
export interface InputLabelProps {
  label?: string;
  labelIcon?: React.ReactNode;
  required?: boolean;
}
const InputLabel = ({ label, labelIcon, required }: InputLabelProps) => {
  return (
    <div className="flex items-center gap-1">
      <h1 className="font-bold">{label}</h1>
      {labelIcon && labelIcon}
    </div>
  );
};

export default InputLabel;
