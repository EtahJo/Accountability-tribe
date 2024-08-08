"use client";
import { SectionHeaderType } from "@/types/types";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

const SectionHeader = ({
	name,
	icon,
	buttonLink,
	buttonTitle,
	classNames,
	pageUsername,
}: SectionHeaderType) => {
	const { user }: any = useCurrentUser();
	const pathname = usePathname();

	const decodedUsername= decodeURIComponent(pageUsername as string)

	return (
		<div
			className={cn(
				"flex items-center gap-3 lg:flex-row flex-col lg:justify-between justify-center",
				pathname.endsWith(user?.username) || !pathname.includes("user")
					? "justify-between"
					: "justify-start",
				classNames,
			)}
		>
			<div
				className={cn(
					"lg:text-3xl font-bold text-shadow-lg xl:whitespace-nowrap largePhone:text-2xl text-xl text-center xl:text-start dark:text-dark-text",
				)}
			>
				{" "}
				{icon && <div>{icon}</div>}
				<div data-testid="section_title">{name}</div>
			</div>
			{buttonLink && decodedUsername === user.username && (
				<Button className="move-button flex items-center gap-1">
					<FaPlusCircle size={20} className="text-lightPink dark:text-dark-lightPrimary"/>
					<Link href={buttonLink}>{buttonTitle}</Link>
				</Button>
			)}
		</div>
	);
};

export default SectionHeader;
