"use client";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSearchParams } from "next/navigation";
import { TribeUser, Tribe, TribeVisit } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationController from "@/components/PaginationController";
import TribeSkeleton from "@/components/Skeletons/TribeSkeleton";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";

type TribeAdminManagementPageProps = Tribe & {
	tribeVisit: TribeVisit[];
	users: TribeUser[];
};
interface USerIsAdminProps {
	asSideBy?: boolean;
	presentTribeId?: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Tribes = ({ asSideBy, presentTribeId }: USerIsAdminProps) => {
	const { user }: any = useCurrentUser();
	const searchParams = useSearchParams();
	let page = parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const { data: tribesData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin?page=${page}`,
		fetcher,
	);
	if (isLoading || tribesData === undefined)
		return (
			<div
				className={cn(
					"flex flex-wrap gap-2 items-center",
					asSideBy ? "flex-col" : "flex-row",
				)}
			>
				{Array.from({ length: 3 }).map((_, index) => (
					<TribeSkeleton key={index} />
				))}
			</div>
		);
	const showOtherTribeInfo = tribesData.tribes.filter(
		(tribe: Tribe) => tribe.id !== presentTribeId,
	);
	const tribestoMapThrough = asSideBy
		? showOtherTribeInfo.slice(0, 6)
		: tribesData.tribes;
	const pageNumbers = [];
	const offsetNumber = 3;
	for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
		if (i >= 1 && i <= tribesData?.totalPages) {
			pageNumbers.push(i);
		}
	}
	return (
		<div className="flex flex-col items-center justify-center">
			<div
				className={cn(
					"flex gap-x-2",
					asSideBy ? "flex-col items-center justify-center" : "flex-wrap ",
				)}
			>
				{tribesData.length === 0 ? (
					<div className="flex flex-col justify-center items-center">
						<p className="text-xl">You are not admin of any tribe</p>
						<Button className="move-button">Create Tribe</Button>
					</div>
				) : (
					tribestoMapThrough?.map(
						({
							id,
							description,
							name,
							profileImage,
							users,
							tribeVisit,
						}: TribeAdminManagementPageProps) => (
							<TribeSnippet
								key={id}
								name={name}
								desc={description}
								tribeId={id}
								userId={user.id}
								isMember={users.some(
									(tribeUser: TribeUser) => tribeUser.userId === user.id,
								)}
								members={users.length}
								image={profileImage}
								lastVisit={tribeVisit[0]?.lastVisit as any}
								manage
							/>
						),
					)
				)}
			</div>
			{asSideBy ? (
				<Link href={"/tribe-admin-management?page=1"}>
					<Button variant={"link"} className="text-purple hover:underline ">
						View All tribes you manage
					</Button>
				</Link>
			) : (
				<PaginationController
					pageNumbers={pageNumbers}
					page={page}
					hasMore={tribesData.hasMore}
					totalPages={tribesData.totalPages}
				/>
			)}
		</div>
	);
};

export default Tribes;
