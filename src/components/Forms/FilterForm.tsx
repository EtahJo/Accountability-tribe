'use client';
import Formsy from 'formsy-react';
import CustomInput from '../CustomInput/customInput';
import { Button } from '@/components/ui/button';
import { detail_session_filter } from '@/action/session/detail-session-filter';
import { toast } from 'sonner';
interface FilterFormProps {
  data: {}[];
  getFilteredData: (data: any) => void;
}

const FilterForm = ({ data, getFilteredData }: FilterFormProps) => {
  const onValidSubmit = (vals: any) => {
    detail_session_filter(data, vals).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.filteredData) {
        getFilteredData(data.filteredData);
      }
    });
  };
  return (
    <Formsy
      onValidSubmit={onValidSubmit}
      className="bg-white w-max p-5 rounded-3xl my-3"
    >
      <div className="flex gap-x-3 largePhone:flex-row flex-col">
        <div>
          <h1 className="font-bold">Duration</h1>
          <div className="flex items-center gap-x-2 medPhone:flex-row flex-col">
            <CustomInput
              name="durationHours"
              type="number"
              placeholder="Hours"
            />
            <CustomInput
              name="durationMinutes"
              type="number"
              placeholder="Minutes"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <CustomInput
            name="startTime"
            type="time"
            placeholder="08:00"
            lable="Start Time"
          />

          {/* <CustomInput
          name="endTime"
          type="time"
          placeholder="20:00"
          lable="End Time"
        /> */}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Filter
      </Button>
    </Formsy>
  );
};

export default FilterForm;
