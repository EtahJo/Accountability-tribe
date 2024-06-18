import { CustomCheckboxProps } from '@/types/types';
import { withFormsy } from 'formsy-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '../ui/checkbox';

const CustomCheckbox = ({ label, checked, onChange }: CustomCheckboxProps) => {
  return (
    <div className="flex bg-white">
      <Checkbox
        onCheckedChange={onChange}
        className="peer  w-8 h-8 border-4 border-black rounded-lg"
        defaultChecked={checked}
      />
      <label className="font-bold cursor-pointer relative  text-lg phone:text-xl">
        <span className="bg-lightPink rounded-full w-5 h-5 absolute z-20 top-1.5 left-1.5 hidden peer-checked:block" />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};

export default withFormsy(CustomCheckbox);
