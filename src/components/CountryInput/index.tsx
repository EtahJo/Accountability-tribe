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
        selectButtonClassName="!border-none !text-black"
        placeholder="Select Country"
        className="shadow-3xl bg-lighterPink  my-px rounded-5xl"
        searchable
        searchPlaceholder="Search Country"
      />
    </div>
  );
};

export default withFormsy<CountryInputProps, any>(CountryInput);
