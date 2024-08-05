"use client";
import useSWR from "swr";
import { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPen } from "react-icons/fa";
import TribeUsers from "@/components/Tribe/TribeUsers/index";
import { useCurrentUser } from "@/hooks/use-current-user";
import { join_tribe } from "@/action/tribe/join-tribe";
import { mutate } from "swr";
import { toast } from "sonner";
import { remove_tribe_user } from "@/action/tribe/remove-tribe-member";
import { TribeUser } from "@prisma/client";
import ProfileImage from "@/components/Tribe/TribeDetailHeader/ProfileImage";
import { delete_tribe } from "@/action/tribe/delete-tribe";
import LongHeaderSkeleton from "@/components/Skeletons/LongHeaderSkeleton";
import UserSkeleton from "@/components/Skeletons/UserSkeleton";
import EditTribeModalForm from "@/components/Forms/EditTribeModalForm";
import EditableComponent from "@/components/Tribe/TribeDetailHeader/EditableComponent";
import DeleteConfirmation from "@/components/Confirmations/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TribeDetailHeaderProps {
	tribeId: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TribeDetailHeader = ({ tribeId }: TribeDetailHeaderProps) => {
	const [isPending, startTransition] = useTransition();
	const searchParams= useSearchParams()
	let page = parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [editTribeModalOpen, setEditTribeModalOpen] = useState(false);
	const { user }: any = useCurrentUser();
	const { data: tribeInfo, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${tribeId}`,
		fetcher,
	);
	const router = useRouter();

	const isAdmin = tribeInfo?.adminsUserIds?.includes(user?.id);
	useEffect(() => {
		router.prefetch(`/user/${user.username}`);
	}, []);
	const joinTribe = () => {
		startTransition(() => {
			join_tribe(tribeId, user?.id as string).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
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
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
					);
					mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/tribes/api/${user.id}?page=${page}&filter=''`)
				}
			});
		});
	};
	const deleteTribe = () => {
		startTransition(() => {
			delete_tribe(tribeId).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
					router.push(`/user/${user.username}`);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
					);
				}
			});
		});
	};
	const leaveTribe = () => {
		startTransition(() => {
			remove_tribe_user(tribeId, user.id).then((data) => {
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
	if (isLoading || tribeInfo === undefined) {
		return (
			<LongHeaderSkeleton classNames="bg-white flex flex-col space-y-4 m-auto justify-center items-center">
				<UserSkeleton classNames="w-[180px] h-[180px]" />
				<div
					className="w-full bg-purple flex flex-col space-y-3 
        rounded-2xl justify-center items-center py-3"
				>
					<Skeleton className="w-[250px] h-12" />
					<Skeleton className="w-[100px] h-6 bg-lightPink" />
				</div>
				<Skeleton className="w-[250px] h-5" />
			</LongHeaderSkeleton>
		);
	}
	const isMember = tribeInfo?.users.some(
		(tribeUser: TribeUser) => tribeUser.userId === user?.id,
	);
	return (
		<div className=" grid  grid-cols-12">
			<div className="bg-white shadow-3xl rounded-3xl p-10  pt-24 flex-col relative col-start-2 col-end-12">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<div
							className="w-[100px] h-[100px] rounded-full 
     bg-lightPink justify-center items-center shadow-buttonInner
      p-2 -mt-24 relative min-[814px]:flex hidden"
						>
							<p
								className="text-shadow-xl text-center whitespace-normal 
              font-bold text-lg circle-message-before"
							>
								You can do it
							</p>
						</div>
						<div
							className="w-[100px] h-[100px] rounded-full  
     bg-lightPink  justify-center items-center shadow-buttonInner p-2 min-[814px]:flex hidden"
						>
							<p
								className="text-shadow-xl text-center whitespace-normal 
              font-bold text-lg circle-message-before"
							>
								Yes you can
							</p>
						</div>
					</div>

					<ProfileImage
						isAdmin={isAdmin}
						profileImage={tribeInfo?.profileImage}
						tribeId={tribeId}
					/>
					<div className="flex items-center">
						<div
							className="w-[100px] h-[100px] rounded-full 
     bg-lightPink justify-center items-center shadow-buttonInner p-2 min-[814px]:flex hidden"
						>
							<p
								className="text-shadow-xl text-center 
              whitespace-normal font-bold text-lg circle-message-before"
							>
								Be Strong
							</p>
						</div>
						<div
							className="w-[100px] h-[100px] rounded-full  bg-lightPink
            justify-center items-center shadow-buttonInner p-2 -mt-24 min-[814px]:flex hidden"
						>
							<p
								className="text-shadow-xl text-center whitespace-normal
               font-bold text-lg circle-message-before before:-ml-3"
							>
								Be Bold
							</p>
						</div>
					</div>
				</div>

				<div className="flex justify-center flex-col gap-3 mt-5">
					<div className="bg-purple px-3 py-2 rounded-xl ">
						<EditableComponent
							tribeId={tribeId}
							text={tribeInfo.name}
							name="name"
							editTrigger={
								<FaPen className="text-lightPink cursor-pointer hover:text-black" />
							}
							cancelTrigger={
								<p className="text-lightPink font-bold cursor-pointer">X</p>
							}
							textClass="md:text-4xl font-bold text-center text-xl"
							showEditOption={isAdmin}
							maxLength={30}
						/>

						<p
							className="text-center text-lightPink cursor-pointer hover:underline"
							onClick={() => {
								setModalIsOpen(true);
							}}
						>
							{tribeInfo?.users.length}{" "}
							{tribeInfo?.users.length > 1 ? "members" : "member"}
						</p>
					</div>
					<EditableComponent
						tribeId={tribeId}
						text={tribeInfo?.description}
						textArea
						name="description"
						editTrigger={
							<FaPen className="text-purple cursor-pointer hover:text-black" />
						}
						cancelTrigger={
							<p className="text-lightPink font-bold cursor-pointer">X</p>
						}
						textClass="md:text-lg  text-center text-sm"
						showEditOption={isAdmin}
						maxLength={100}
					/>

					{isAdmin && (
						<Button
							className="w-max m-auto move-button"
							onClick={() => setEditTribeModalOpen(true)}
						>
							Edit Tribe Information
						</Button>
					)}
					{tribeInfo?.users?.length === 0 && isAdmin && (
						<DeleteConfirmation
							trigger={
								<Button
									className="move-button w-max m-auto"
									variant={"destructive"}
									disabled={isPending}
								>
									Delete Tribe
								</Button>
							}
							confirmationMessage="Are you sure you wan to delete task?"
							consequenceMessage="This action can not be reversed!"
							action={
								<Button onClick={deleteTribe} disabled={isPending}>
									Delete Anyway
								</Button>
							}
						/>
					)}

					{!isMember ? (
						<Button
							onClick={joinTribe}
							className="w-48 m-auto move-button"
							disabled={isPending}
						>
							Join Us
						</Button>
					) : (
						!isAdmin && (
							<DeleteConfirmation
								trigger={
									<Button className="w-48 m-auto move-button bg-gray-400 hover:bg-gray-600">
										Leave Tribe
									</Button>
								}
								confirmationMessage="Are you sure you want to leave tribe?"
								consequenceMessage="You will no longer be able to participate in tribe"
								action={
									<Button
										className="bg-gray-400 hover:bg-gray-600"
										onClick={leaveTribe}
									>
										Leave Anyway
									</Button>
								}
							/>
						)
					)}
				</div>
				<TribeUsers
					isOpen={modalIsOpen}
					users={tribeInfo?.users}
					onRequestClose={() => setModalIsOpen(false)}
					tribeName={tribeInfo?.name}
					tribeId={tribeId}
				/>
				<EditTribeModalForm
					isOpen={editTribeModalOpen}
					onRequestClose={() => setEditTribeModalOpen(false)}
					tribeDescription={tribeInfo?.description}
					tribeName={tribeInfo?.name}
					tribeId={tribeId}
					profileImage={tribeInfo?.profileImage}
					tribeTags={new Set(tribeInfo?.tags)}
				/>
			</div>
		</div>
	);
};

export default TribeDetailHeader;
