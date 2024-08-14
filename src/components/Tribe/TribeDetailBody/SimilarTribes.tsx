"use client";
import useSWR from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import SectionHeader from "@/components/SectionHeader";
import TribeSkeleton from "@/components/Skeletons/TribeSkeleton";
import { TribeUser, TribeVisit, Tribe} from "@prisma/client";
import NoData from "@/components/NoData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SimilarTribes = ({ tribeId }: { tribeId: string }) => {
	const { user }: any = useCurrentUser();
	const currentUserId = user?.id|| process.env.NEXT_PUBLIC_GUEST_USER_ID;
	const { data: similarTribes, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${currentUserId}/${tribeId}/similar-tribes`,
		fetcher,
	);
	if (isLoading || similarTribes === undefined)
		return (
			<div className="flex flex-col items-center gap-y-2">
				{Array.from({ length: 3 }).map((_, index) => (
					<TribeSkeleton key={index} />
				))}
			</div>
		);

	return (
		<div>
			<SectionHeader name="Similar Tribes" />
			<div>
				{ similarTribes?.tribes?.length ===0?
				<NoData message="No Similar tribes"/>
				:
				similarTribes?.tribes?.map(
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
					}) => (
						<div key={id}>
							<TribeSnippet
								name={name}
								desc={description}
								image={profileImage}
								members={users.length}
								isMember={users?.some(
									(tribeUser: TribeUser) => tribeUser.userId === user?.id,
								)}
								lastVisit={
									tribeVisit.length > 0
										? (tribeVisit[0]?.lastVisit as any)
										: null
								}
								tribeId={id}
								userId={user?.id}
							/>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default SimilarTribes;
