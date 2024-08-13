"use client";
import { FaCalendar, FaClock } from "react-icons/fa";

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
			{isTodayCheck &&(
				<div className="flex ">
					{timeLeft > 0 ? (
						<div className="flex gap-1 flex-nowrap">
							<p className="text-sm whitespace-nowrap">Starts in </p>{" "}
							<p className="text-purple font-bold text-sm whitespace-nowrap dark:text-dark-primary">
								{timeLeft} Mins
							</p>
						</div>
					) : (
						<p className="text-purple font-extrabold">
							{checkIfAfter ? "Ended" : "Started"}
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
				{(isBefore || !isTodayCheck || checkIfAfter)
					 && (
						<span>
							<span className="flex items-center gap-x-2">
								<FaCalendar className="text-purple dark:text-dark-primary" />
								<p>{startDate}</p>
							</span>

							<span className="flex items-center gap-x-2">
								<FaClock className="text-purple dark:text-dark-primary" />
								<p> {startTime}</p>
							</span>
						</span>
					)}
			</div>
		</div>
	);
};

export default PeriodCheck;
