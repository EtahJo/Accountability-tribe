'use client';
import ReactFlagsSelect from 'react-flags-select';
import { withFormsy } from 'formsy-react';

interface CountryInputProps {
  selected: string | undefined;
  onSelect: (val: any) => void;
  disabled: boolean;
}

const CountryInput = ({ selected, onSelect, disabled }: CountryInputProps) => {
  return (
    <div>
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        // selectButtonClassName="bg-purple"
        placeholder="Select Country"
        className="shadow-3xl bg-lighterPink rounded-3xl p-px my-4
         outline-none border-0"
      />
    </div>
  );
};

export default withFormsy<CountryInputProps, any>(CountryInput);
