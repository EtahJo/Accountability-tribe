"use client";
import { useRouter } from "next/navigation";
import NavbarIcon from "@/components/NavbarIcon/index";
import { CldImage } from "next-cloudinary";
import { Avatar , AvatarImage,AvatarFallback} from "@radix-ui/react-avatar";
import { logout } from "@/action/auth/logout";
import { FaCog, FaUser } from "react-icons/fa";
import Link from "next/link";
import { ExitIcon } from "@radix-ui/react-icons";
import NavbarItem from "@/components/ProfileIconItem/index";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTheme } from "next-themes";
import {
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

interface ProfileIconProps{
	deleteUser:React.ReactNode;
}

const ProfileIcon = ({ deleteUser }:ProfileIconProps) => {
	const { user ,session}: any = useCurrentUser();
	const { setTheme } = useTheme()
	const router = useRouter();
	const onLogoutClick = () => {
		logout().then(() => {
			router.push("/auth/login");
		});
	};
	return (
		<div>
			<NavbarIcon
				trigger={
					<div>
						{user?.image ? (
							<Avatar>
								
								{session.data.user.isOAuth ?
									<AvatarImage src={user?.image} className='rounded-full shadow-3xl w-12 h-12 object-contain'/>
								:
								<CldImage
									src={user?.image}
									width="50"
									height="50"
									crop={"fill"}
									alt="User Profile"
									sizes="100vw"
									className="rounded-full shadow-3xl"
								/>}
							</Avatar>
						) : (
							<div className="rounded-full bg-lightPink p-1.5 cursor-pointer shadow-3xl ">
								<FaUser size={20} className="text-white" />
							</div>
						)}
					</div>
				}
			>
				{" "}
				<p className="font-semibold my-5 text-center text-sm">
					{" "}
					Hello, {user?.username}
				</p>
				<DropdownMenuItem>
					<Link href={`/user/${user?.username}`}>
						<NavbarItem
							title="Visit Your Profile"
							icon={<FaUser size={25} />}
						/>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<NavbarItem title="Settings" icon={<FaCog size={25} />} />
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent sideOffset={-120}>
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light Mode
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark Mode
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("system")}>
								System Mode
							</DropdownMenuItem>
							<DropdownMenuItem>{deleteUser}</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuItem onClick={onLogoutClick} className="ml-1.5">
					<NavbarItem title="Logout" icon={<ExitIcon />} />
				</DropdownMenuItem>
			</NavbarIcon>
		</div>
	);
};

export default ProfileIcon;
