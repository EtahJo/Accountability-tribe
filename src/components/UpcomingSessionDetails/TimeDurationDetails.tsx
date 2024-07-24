import { FaClock } from 'react-icons/fa';

interface TimeDurationDetailsProps {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  duration: { hours: string; minutes: string };
}

const TimeDurationDetails = ({
  startDate,
  startTime,
  endDate,
  endTime,
  duration,
}: TimeDurationDetailsProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex justify-between mx-4">
        <div className="flex items-start gap-2">
          <p className="font-bold">Start:</p>
          <span>
            <p>{startDate}</p>
            <p>{startTime}</p>
          </span>
        </div>
        <div className="flex items-start gap-2">
          <p className="font-bold">End:</p>
          <span>
            <p>{endDate}</p>
            <p>{endTime}</p>
          </span>
        </div>
      </div>
      <span className="flex items-center gap-1 mx-4">
        <FaClock className="text-purple" />
        <p className="font-bold">Duration:</p>
        <p className="  rounded-md px-2 py-px bg-lightPink">
          {duration.hours !== '00' && duration.hours + 'h '}
          {duration.minutes !== '00' && duration.minutes + 'm'}
        </p>
      </span>
    </div>
  );
};

export default TimeDurationDetails;
