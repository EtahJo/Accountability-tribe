interface UpcomingSessionDetailHeaderProps {
  isTodayCheck: boolean;
  isThisWeekCheck: boolean;
  checkIfAfter: boolean;
  onGoing: boolean;
  timeLeft: number;
  startDate: string;
  startTime: string;
}

const UpcomingSessionDetailHeader = ({
  timeLeft,
  startDate,
  startTime,
  isTodayCheck,
  isThisWeekCheck,
  checkIfAfter,
  onGoing,
}: UpcomingSessionDetailHeaderProps) => {
  return (
    <div className="bg-purple rounded-2xl px-5 py-2 text-xl font-bold text-white ">
      {checkIfAfter && <p className="text-center">This Session has ended</p>}
      {onGoing && (
        <p className="text-center animate-zoom">This Session is Ongoing</p>
      )}
      {isTodayCheck && !checkIfAfter && !onGoing && (
        <div className="flex gap-2 justify-center">
          <p>Sessions starts in </p>
          <p className="text-lightPink animate-zoom">{timeLeft} minutes</p>
        </div>
      )}
      {isThisWeekCheck && !onGoing && !checkIfAfter && (
        <p className="text-center flex gap-x-2 justify-center">
          {startDate} at{' '}
          <p className="animate-zoom text-lightPink">{startTime}</p>
        </p>
      )}
    </div>
  );
};

export default UpcomingSessionDetailHeader;
