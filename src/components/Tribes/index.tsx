"use client";
import useSWR from "swr";
import SectionHeader from "../SectionHeader/index";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaPlusCircle } from "react-icons/fa";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { Post, TribeUser, TribeVisit, Tribe } from "@prisma/client";
import TribeSkeleton from "../Skeletons/TribeSkeleton";

interface TribesProps {
	pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Tribes = ({ pageUsername }: TribesProps) => {
	const { user }: any = useCurrentUser();
	const { data: tribesData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${pageUsername}/${user.id}?page=1`,
		fetcher,
	);
	if (isLoading || tribesData === undefined) {
		return (
			<div className="flex flex-col gap-y-2">
				{Array.from({ length: 3 }).map((_, index) => (
					<TribeSkeleton key={index} />
				))}
			</div>
		);
	}

	const tribesToDisplay = tribesData.tribes.slice(0, 4);

	return (
		<div className="flex flex-col justify-center">
			<SectionHeader
				name="Tribes"
				classNames="flex-row"
				buttonTitle="Create Tribe"
				pageUsername={pageUsername}
				buttonLink="/create-tribe"
				buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
			/>
			<div>
				{tribesToDisplay?.map(
					({
						description,
						id,
						name,
						newPosts,
						profileImage,
						users,
						tribeVisit,
					}: Tribe & {
						newPosts: Post[];
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
								newPosts={newPosts}
							/>
						);
					},
				)}
			</div>
			<div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto ">
				<Link href={`/user/${pageUsername}/tribes?page=1`}>
					View All Tribes
				</Link>
				<FaArrowRight />
			</div>
		</div>
	);
};

export default Tribes;
