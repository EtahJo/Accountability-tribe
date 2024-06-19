import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectPeriod = () => {
  return (
    <div className="w-10">
      <Select>
        <SelectTrigger></SelectTrigger>
      </Select>
    </div>
  );
};

export default SelectPeriod;
