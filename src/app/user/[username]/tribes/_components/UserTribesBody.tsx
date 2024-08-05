"use client";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSearchParams } from "next/navigation";
import TribeSkeleton from "@/components/Skeletons/TribeSkeleton";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import PaginationController from "@/components/PaginationController";
import { Post, TribeUser, TribeVisit, Tribe } from "@prisma/client";
import TribesFilter from "@/app/tribes/_components/TribesFilter";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const UserTribesBody = ({ pageUsername }: { pageUsername: string }) => {
	const { user }: any = useCurrentUser();
	const searchParams = useSearchParams();
	let page = parseInt(searchParams?.get("page") as string, 10);
	page = !page || page < 1 ? 1 : page;
	const filter = searchParams.get("filter") || "";
	const { data: tribesData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${pageUsername}/${user.id}?page=${page}&filter=${filter}`,
		fetcher,
	);
	if (isLoading || tribesData === undefined) {
		return (
			<div className="flex flex-wrap gap-2 items-center">
				{Array.from({ length: 3 }).map((_, index) => (
					<TribeSkeleton key={index} />
				))}
			</div>
		);
	}
	const tags = new Set();
	const {tribes, totalPages,hasMore} = tribesData
	if(tribes.length===0){
		<div className="bg-white rounded-3xl shadow-3xl p-5 flex justify-center my-10">
			<div>
				<p>{`${pageUsername} belongs to no tribes`}</p>
			</div>
		</div>
	}

	tribes?.forEach((item: any) => {
		item.tags.forEach((tag: string) => {
			tags.add(tag);
		});
	});
	return (
		<div className="flex flex-col  h-max">
			<TribesFilter tags={Array.from(tags)} page={page} />
			<div className="flex flex-wrap items-center justify-start">
				{tribes?.map(
					({
						description,
						id,
						name,
						profileImage,
						users,
						tribeVisit,
					}: Tribe & {
						users: TribeUser[];
						tribeVisit: TribeVisit[];
					}) => {
						return (
							<TribeSnippet
								key={id}
								name={name}
								desc={description}
								tribeId={id}
								members={users.length}
								isMember={users?.some(
									(tribeUser: TribeUser) => tribeUser.userId === user.id,
								)}
								userId={user?.id as string}
								image={profileImage}
								lastVisit={
									tribeVisit.length > 0
										? (tribeVisit[0]?.lastVisit as any)
										: null
								}
							/>
						);
					},
				)}
			</div>
			<PaginationController
				page={page}
				hasMore={hasMore}
				totalPages={totalPages}
				filter={filter}
			/>
		</div>
	);
};

export default UserTribesBody;
