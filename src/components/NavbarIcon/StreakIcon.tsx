import NavbarIcon from "@/components/NavbarIcon/index";
import { FaBolt } from "react-icons/fa";
import NavbarItem from "@/components/ProfileIconItem/index";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface StreakIconProps {
	count: number;
}

const StreakIcon = ({ count }: StreakIconProps) => {
	return (
		<div>
			<NavbarIcon
				trigger={
					<NavbarItem
						icon={<FaBolt size={25} className="text-white text-shadow-lg" />}
						number={count}
					/>
				}
			>
				<div className="flex items-center whitespace-nowrap gap-2 m-2">
					<span
						className="flex flex-col justify-center items-center
           rounded-3xl bg-lighterPink px-4 py-1"
					>
						<p className="font-bold text-xl text-purple">{count}</p>
						<p className="opacity-45">Current Streak</p>
					</span>

					<span
						className="flex flex-col justify-center items-center
            rounded-3xl bg-lighterPink px-4 py-1"
					>
						<p className="font-bold text-xl text-purple">{count}</p>
						<p className="opacity-45">Longest Streak</p>
					</span>
				</div>
				<span className="flex whitespace-nowrap justify-center font-bold">
					<p>Total Active Days:</p>
					<p>{count}</p>
				</span>
			</NavbarIcon>
		</div>
	);
};

export default StreakIcon;
