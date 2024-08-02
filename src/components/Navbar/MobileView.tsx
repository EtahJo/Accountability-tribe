"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import NavbarItem from "@/components/ProfileIconItem/index";
import NotificationIcon from "../NavbarIcon/NotificationIcon";
import StreakIcon from "../NavbarIcon/StreakIcon";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MobileViewProps {
	closeDropdown: () => void;
}

const MobileView = ({ closeDropdown }: MobileViewProps) => {
	const { user }: any = useCurrentUser();
	const pathname = usePathname();
	return (
		<div className="absolute top-0 w-full h-screen right-0 left-0 block lg:hidden">
			<div className="bg-purple  w-full p-10 ">
				<p
					onClick={closeDropdown}
					className="absolute right-5 font-bold hover:text-white cursor-auto"
				>
					X
				</p>
				{user && (
					<div className="flex flex-wrap justify-between items-center">
						<NavbarItem
							title="Notifications"
							titleClass="uppercase text-xl"
							icon={<NotificationIcon notifications={user.notifications} />}
						/>
						<NavbarItem
							title="Streak"
							titleClass="uppercase text-xl"
							icon={<StreakIcon count={user?.streak?.count} />}
						/>
					</div>
				)}
				{!user && (
					<div className="flex flex-col items-center gap-y-2 mb-2">
						<Link
							className="font-thin hover:font-bold cursor-pointer"
							href={"/auth/login"}
						>
							Login
						</Link>
						<Link
							href={"/auth/signup"}
							className="text-white font-thin hover:font-bold cursor-pointer"
						>
							Sign Up
						</Link>
					</div>
				)}
				<div className="flex flex-col gap-y-2">
					<Link
						href={"/tribes?page=1"}
						className={cn(
							"bg-lightPink  p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black  group my-0",
							pathname.startsWith("/tribes") && "bg-black text-white ",
						)}
					>
						<p className="w-full group-hover:text-white">Tribes</p>
					</Link>
					<Link
						href={"/sessions?page=1&filter=all"}
						className={cn(
							"bg-lightPink  p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black ",
							pathname.startsWith("/sessions") && "bg-black text-white ",
						)}
					>
						Sessions
					</Link>
					{user && (
						<Link
							href={"/tribe-admin-management"}
							className={cn(
								"bg-lightPink  p-2 text-center text-xl uppercase hover:bg-black hover:text-white move-button text-black ",
								pathname.startsWith("/tribe-admin-management") &&
									"bg-black text-white ",
							)}
						>
							Manage Tribes
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileView;
