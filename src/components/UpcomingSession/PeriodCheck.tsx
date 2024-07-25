'use client';
import { FaCalendar } from 'react-icons/fa';

interface PeriodCheckProps {
  isTodayCheck: boolean;
  timeLeft: number;
  checkIfAfter: boolean;
  startDate: string;
  startTime: string;
}

const PeriodCheck = ({
  isTodayCheck,
  timeLeft,
  checkIfAfter,
  startDate,
  startTime,
}: PeriodCheckProps) => {
  return (
    <div>
      {isTodayCheck && (
        <div className="flex ">
          {timeLeft > 0 ? (
            <div className="flex gap-1 flex-nowrap">
              <p className="text-sm whitespace-nowrap">Starts in </p>{' '}
              <p className="text-purple font-bold text-sm whitespace-nowrap">
                {timeLeft} Mins
              </p>
            </div>
          ) : (
            <p className="text-purple font-extrabold">
              {checkIfAfter ? 'Ended' : 'Started'}
            </p>
          )}
        </div>
      )}
      {!isTodayCheck && !checkIfAfter && (
        <div className="flex items-center gap-1">
          <FaCalendar className="text-purple" />
          <p className="font-bold whitespace-nowrap text-xs">
            <>
              {checkIfAfter ? (
                <p className="text-normal">Past</p>
              ) : (
                <>
                  {' '}
                  {isTodayCheck
                    ? timeLeft < 0
                      ? 'Started Today'
                      : 'Today'
                    : startDate}{' '}
                  at {startTime}
                </>
              )}
            </>
          </p>
        </div>
      )}
    </div>
  );
};

export default PeriodCheck;
