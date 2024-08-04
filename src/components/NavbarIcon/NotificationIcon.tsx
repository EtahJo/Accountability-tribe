import {
	FaBell,
	FaExclamationCircle,
	FaCheckCircle,
	FaTasks,
	FaSync,
	FaHourglassEnd,
	FaStopwatch,
	FaThumbsUp,
	FaComment,
} from "react-icons/fa";
import NavbarIcon from "@/components/NavbarIcon/index";
import NavbarItem from "@/components/ProfileIconItem/index";
import { update_notification } from "@/action/notification/update";
import { Notification } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NotificationIconProps {
	notifications: Notification[];
}
const NotificationIcon = ({ notifications }: NotificationIconProps) => {
	const unReadNotifications = notifications?.filter(
		(notification) => !notification.read,
	);
	const onNotificationClick = (notificationId: string) => {
		update_notification(notificationId);
	};

	return (
		<div>
			<NavbarIcon
				trigger={
					<NavbarItem
						icon={<FaBell size={25} className="text-white text-shadow-lg" />}
						number={
							unReadNotifications?.length !== 0
								? unReadNotifications?.length
								: null
						}
					/>
				}
			>
				{notifications?.map((notification) => (
					<DropdownMenuItem
						key={notification.id}
						className="w-[300px] cursor-pointer border-b"
						onClick={() => onNotificationClick(notification.id)}
					>
						<div className="flex items-center gap-2 text-lightPink group">
							{notification.type === "WARNING" && <FaExclamationCircle />}
							{notification.type === "APPROVAL" && <FaCheckCircle />}
							{notification.type === "ADMINTASK" && <FaTasks />}
							{notification.type === "SESSIONUPDATES" && <FaSync />}
							{notification.type === "DEADLINES" && <FaHourglassEnd />}
							{notification.type === "SESSIONSTART" && <FaStopwatch />}
							{notification.type === "LIKE" && <FaThumbsUp />}
							{notification.type === "COMMENT" && <FaComment />}
							<span
								className={cn(
									"text-black group-hover:text-purple",
									notification.read ? "font-normal" : "font-bold",
								)}
							>
								{" "}
								{notification.pageId && notification.locationId && (
									<Link
										href={`/tribe/${notification.pageId}#${notification.locationId}`}
									>
										{notification.message}
									</Link>
								)}
								{notification.pageId && notification.type === "ADMINTASK" && (
									<Link href={`/tribe-admin-management/${notification.pageId}`}>
										{notification.message}
									</Link>
								)}
								{!notification.pageId && !notification.locationId && (
									<p>{notification.message}</p>
								)}
							</span>
						</div>
					</DropdownMenuItem>
				))}
			</NavbarIcon>
		</div>
	);
};

export default NotificationIcon;
