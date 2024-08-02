import { FaClock } from "react-icons/fa";

interface SessionDurationProps {
	duration: { hours: string; minutes: string };
}
const SessionDuration = ({ duration }: SessionDurationProps) => {
	return (
		<div className="flex  bg-lighterPink  h-[80px] justify-center items-center rounded-3xl px-4 gap-2">
			<FaClock size={30} className="text-purple" />
			<div>
				<p className="text-[rgba(0,0,0,0.3)]">Duration</p>
				{duration && (
					<p className="font-bold whitespace-nowrap">
						{duration.hours}h {duration.minutes}m
					</p>
				)}
			</div>
		</div>
	);
};

export default SessionDuration;
