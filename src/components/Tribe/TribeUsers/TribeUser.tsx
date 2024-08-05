"use client";
import { useTransition } from "react";
import { CldImage } from "next-cloudinary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { remove_tribe_user } from "@/action/tribe/remove-tribe-member";
import { make_tribe_admin } from "@/action/tribe/add-tribe-admin";
import { remove_as_admin } from "@/action/tribe/remove-as-admin";
import { toast } from "sonner";
import Link from "next/link";
import { mutate } from "swr";
import { FaUser } from "react-icons/fa";

interface TribeUserProps {
	name: string;
	profileImage: string;
	isAdmin: boolean;
	adminsUserIds?: string[];
	userId?: string;
	tribeId?: string;
	users?: {
		user: { username: string; image: string };
		userRole: string;
		adminsUserIds: string[];
		userId: string;
	}[];
}
const TribeUser = ({
	name,
	profileImage,
	isAdmin,
	adminsUserIds,
	userId,
	tribeId,
	users,
}: TribeUserProps) => {
	const [isPending, startTransition] = useTransition();
	const { user }: any = useCurrentUser();
	const canLeaveTribe =
		user.id === userId &&
		(!adminsUserIds?.includes(userId as string) ||
			(adminsUserIds.length > 1 && adminsUserIds.includes(userId as string)));
	const isAdminLoggedIn = adminsUserIds?.includes(user.id);
	const canAdminleaveTribe = isAdminLoggedIn && users?.length === 1;
	const canMakeAdmin = !adminsUserIds?.includes(userId as string);

	const canUnMakeAdmin = adminsUserIds ? adminsUserIds.length > 1 : null;
	const makeAdmin = () => {
		startTransition(() => {
			if (tribeId && userId)
				make_tribe_admin(tribeId, userId).then((data) => {
					if (data?.success) {
						toast.success(data.success);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`,
						);
					}
					if (data?.error) {
						toast.error(data.error);
					}
				});
		});
	};
	const removeAsAdmin = () => {
		startTransition(() => {
			if (tribeId && userId)
				remove_as_admin(tribeId, userId).then((data) => {
					if (data?.success) {
						toast.success(data.success);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`,
						);
					}
					if (data?.error) {
						toast.error(data.error);
					}
				});
		});
	};
	const removeTribeUser = () => {
		startTransition(() => {
			if (tribeId && userId)
				remove_tribe_user(tribeId, userId).then((data) => {
					if (data.success) {
						toast.success(data.success);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/recommended-tribes/${user.id}`,
						);
					}
					if (data.error) {
						toast.error(data.error);
					}
				});
		});
	};

	return (
		<div className="flex items-center gap-x-3 rounded-sm hover:shadow-3xl hover:bg-lighterPink p-2 w-full justify-between">
			<Link href={`/user/${name}`} className=" flex items-center gap-x-2">
				<Avatar className=" w-[40px] h-[40px] z-10 items-center border-2 border-lightPink  shadow-3xl">
					{!profileImage ? (
						<AvatarFallback className="bg-black">
							<FaUser className="text-white" size={100} />
						</AvatarFallback>
					) : (
						user.isOAuth?
						<AvatarImage 
						src={profileImage} 
						className='rounded-full shadow-3xl w-44 h-44 object-contain'/>
						:
						<CldImage
							width="180"
							height="180"
							crop={"fill"}
							src={profileImage}
							sizes="100vw"
							alt="Tribe profile"
						/>
					)}
				</Avatar>
				<span>
					<p className="text-lg">{name}</p>
					{isAdmin && <p className="text-sm text-gray-400">Admin</p>}
				</span>
			</Link>

			<div className="flex items-center  justify-between ">
				<div className="flex justify-end items-center gap-x-2">
					{(canLeaveTribe || canAdminleaveTribe) && (
						<Button
							size={"sm"}
							className="bg-gray-400 hover:bg-gray-600"
							onClick={removeTribeUser}
							disabled={isPending}
						>
							Leave Tribe
						</Button>
					)}
					{isAdminLoggedIn && name !== user.username && (
						<Button
							size={"sm"}
							variant={"destructive"}
							onClick={removeTribeUser}
							disabled={isPending}
						>
							Remove Member
						</Button>
					)}
					{isAdminLoggedIn &&
						(canMakeAdmin ? (
							<Button size={"sm"} onClick={makeAdmin} disabled={isPending}>
								Make Admin
							</Button>
						) : (
							canUnMakeAdmin && (
								<Button
									size={"sm"}
									disabled={isPending}
									onClick={removeAsAdmin}
								>
									Remove As Admin
								</Button>
							)
						))}
				</div>
			</div>
		</div>
	);
};

export default TribeUser;
