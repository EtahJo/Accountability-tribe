'use client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { withFormsy } from 'formsy-react';
interface PhoneNumberInputProps {
  value: string;
  onChange: (val: any, country: any) => void;
}
const PhoneNumberInput = ({ value, onChange }: PhoneNumberInputProps) => {
  return (
    <div className="max-[538px]:w-[200px]">
      <PhoneInput
        country={'cm'}
        value={value}
        onChange={onChange}
        inputClass={
          '!w-full !bg-lighterPink !rounded-5xl !border-none !shadow-3xl'
        }
        buttonClass={'!bg-lightPink !border-none !rounded-l-5xl'}
        containerClass={'md:my-4 '}
      />
    </div>
  );
};

export default withFormsy<PhoneNumberInputProps, any>(PhoneNumberInput);
