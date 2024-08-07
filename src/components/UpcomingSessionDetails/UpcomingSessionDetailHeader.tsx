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
		<div className="bg-purple rounded-2xl px-5 py-2 largePhone:text-lg font-bold text-white min-[489px]:text-sm min-[367px]:text-xs text-[10px] dark:bg-dark-primary">
			{checkIfAfter && (
				<p className="text-center whitespace-nowrap">This Session has ended</p>
			)}
			{onGoing && (
				<p className="text-center animate-zoom whitespace-nowrap">
					This Session is Ongoing
				</p>
			)}
			{isTodayCheck && !checkIfAfter && !onGoing && (
				<div className="flex  justify-center flex-col items-center largePhone:flex-row largePhone:gap-2">
					<p className="whitespace-nowrap">Starts in </p>
					<p className="text-lightPink animate-zoom whitespace-nowrap dark:text-dark-background">
						{timeLeft} minutes
					</p>
				</div>
			)}
			{isThisWeekCheck && !onGoing && !checkIfAfter && (
				<div className="flex justify-center flex-col items-center largePhone:flex-row largePhone:gap-2">
					<p className="text-center whitespace-nowrap">{startDate} at </p>
					<p className="animate-zoom text-lightPink whitespace-nowrap dark:text-dark-background">
						{startTime}
					</p>
				</div>
			)}
		</div>
	);
};

export default UpcomingSessionDetailHeader;
