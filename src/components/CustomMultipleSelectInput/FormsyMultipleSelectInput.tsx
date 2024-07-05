import React from 'react';
import { withFormsy, FormsyInjectedProps } from 'formsy-react';
import CustomMultipleSelectInput, {
  OptionType,
} from '@/components/CustomMultipleSelectInput';

const FormsyMultipleSelectInput = ({
  setValue,
  value,
  options,
}: FormsyInjectedProps<OptionType> & { options: OptionType[] }) => {
  const onChange = (selectedOptions: any) => {
    setValue(selectedOptions);
  };
  return (
    <CustomMultipleSelectInput
      onChange={onChange}
      value={value}
      options={options}
    />
  );
};

export default withFormsy(FormsyMultipleSelectInput);
