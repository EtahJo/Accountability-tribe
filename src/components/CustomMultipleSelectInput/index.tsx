'use client';
import Select from 'react-select';

export interface OptionType {
  value: string;
  label: string;
}

interface CustomMultipleSelectInputProps {
  options: OptionType[];
  onChange: (val: any) => void;
  value: any;
  placeholder?: string;
  noOptionsMessage: string;
}
const CustomMultipleSelectInput = ({
  options,
  value,
  onChange,
  placeholder,
}: CustomMultipleSelectInputProps) => {
  return (
    <Select
      isMulti
      onChange={onChange}
      options={options}
      value={value}
      placeholder={placeholder}
      //   noOptionsMessage={<div></div>}
      classNames={{
        container: (state) =>
          state.isFocused
            ? 'shadow-3xl bg-lighterPink rounded-3xl p-px my-4 flex w-[280px] !outline-none'
            : 'shadow-3xl bg-lighterPink rounded-3xl p-px my-4 flex w-[280px]',
        control: (state) =>
          state.isFocused
            ? 'flex w-[280px] !border-none !bg-transparent !outline-none p-px'
            : '  flex w-[280px] !border-none !bg-transparent outline-none',
        valueContainer: (state) =>
          state.isMulti
            ? '!bg-transparent rounded-3xl   border-none '
            : ' !bg-transparent rounded-3xl  flex w-[280px] border-none',
        input: (state) =>
          state.isMulti
            ? '!bg-transparent rounded-3xl   border-none'
            : ' !bg-transparent rounded-3xl  flex w-[280px] border-none',
        multiValueLabel: (state) =>
          state.isMulti
            ? '!bg-lightPink rounded-3xl  flex border-none'
            : ' !bg-transparent rounded-3xl  flex w-[280px] border-none',
        multiValueRemove: (state) =>
          state.isMulti
            ? '!bg-black rounded-3xl  text-white  border-none'
            : '!bg-transparent rounded-3xl  flex w-[280px] border-none',
        indicatorsContainer: (state) =>
          state.isMulti
            ? ' text-lightPink  border-none hover:text-lightPink'
            : '!bg-transparent rounded-3xl  flex w-[280px] border-none',
      }}
      classNamePrefix="select"
    />
  );
};

export default CustomMultipleSelectInput;
