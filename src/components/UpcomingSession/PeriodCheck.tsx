'use client';
import { FaCalendar, FaClock } from 'react-icons/fa';

interface PeriodCheckProps {
  isTodayCheck: boolean;
  timeLeft: number;
  checkIfAfter: boolean;
  isBefore: boolean;
  startDate: string;
  startTime: string;
}

const PeriodCheck = ({
  isTodayCheck,
  timeLeft,
  isBefore,
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
      <div className="flex items-start gap-2 largePhone:flex-row flex-col">
        {checkIfAfter && (
          <p className="text-normal font-bold whitespace-nowrap text-xs">
            Past on
          </p>
        )}
        {isBefore ||
          (checkIfAfter && (
            <span>
              <span className="flex items-center gap-x-2">
                <FaCalendar className="text-purple" />
                <p>{startDate}</p>
              </span>

              <span className="flex items-center gap-x-2">
                <FaClock className="text-purple" />
                <p> {startTime}</p>
              </span>
            </span>
          ))}
      </div>

      {/* {!isTodayCheck && !checkIfAfter && (
        <div className="flex items-center gap-1">
          <span className="font-bold whitespace-nowrap text-xs">
            <>
              {checkIfAfter ? (
                <p className="text-normal">Past</p>
              ) : (
                <>
                  {' '}
                  {isTodayCheck ? (
                    timeLeft < 0 ? (
                      'Started Today'
                    ) : (
                      'Today'
                    )
                  ) : (
                    <span>
                      <span className="flex items-center gap-x-2">
                        <FaCalendar className="text-purple" />
                        <p>{startDate}</p>
                      </span>

                      <span className="flex items-center gap-x-2">
                        <FaClock className="text-purple" />
                        <p> {startTime}</p>
                      </span>
                    </span>
                  )}
                </>
              )}
            </>
          </span>
        </div>
      )} */}
    </div>
  );
};

export default PeriodCheck;
