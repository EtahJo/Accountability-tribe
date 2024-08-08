import { FaClock } from "react-icons/fa";

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
		<div className="flex flex-col gap-y-6 text-xs min-[441px]:text-sm">
			<div
				className="flex min-[586px]:justify-between min-[586px]:flex-row flex-col justify-center min-[586px]:items-start  dark:text-black
      items-center min-[586px]:gap-y-0 gap-y-2"
			>
				<div className="flex items-start gap-2 min-[586px]:border-b-transparent border-b border-b-lightPink min-[586px]:pb-0 pb-2">
					<p className="font-bold">Start:</p>
					<span>
						<p>{startDate}</p>
						<p>{startTime}</p>
					</span>
				</div>
				<div className="flex items-start gap-2 ">
					<p className="font-bold">End:</p>
					<span>
						<p>{endDate}</p>
						<p>{endTime}</p>
					</span>
				</div>
			</div>
			<span className="flex items-center gap-1 mx-4 min-[586px]:justify-start justify-center">
				<FaClock className="text-purple dark:text-dark-primary" />
				<p className="font-bold dark:text-black">Duration:</p>
				<p className="  rounded-md px-2 py-px bg-lightPink dark:bg-dark-background">
					{duration.hours !== "00" && duration.hours + "h "}
					{duration.minutes !== "00" && duration.minutes + "m"}
				</p>
			</span>
		</div>
	);
};

export default TimeDurationDetails;
