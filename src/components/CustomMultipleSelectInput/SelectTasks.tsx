'use client';
import CustomMultipleSelectInput from '@/components/CustomMultipleSelectInput';
import { withFormsy, FormsyInjectedProps } from 'formsy-react';

interface OptionType {
  id: string;
  title: string;
}

const SelectTasks = ({
  setValue,
  value,
  options, // a list of  all user tasks that are not yet added to session
}: FormsyInjectedProps<OptionType> & { options: OptionType[] }) => {
  const onChange = (selectedOptions: any) => {
    setValue(selectedOptions);
  };
  return (
    <CustomMultipleSelectInput
      value={value}
      options={options.map((options) => ({
        value: options.id,
        label: options.title,
      }))}
      onChange={onChange}
    />
  );
};

export default withFormsy(SelectTasks);
