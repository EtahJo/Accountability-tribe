"use client";
import useSWR from "swr";
import SectionHeader from "../SectionHeader/index";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaPlusCircle } from "react-icons/fa";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import {TribeUser, TribeVisit, Tribe } from "@prisma/client";
import TribeSkeleton from "../Skeletons/TribeSkeleton";
import NoData from "../NoData";

interface TribesProps {
	pageUsername: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Tribes = ({ pageUsername }: TribesProps) => {
	const { user }: any = useCurrentUser();
	const currentUserId = user?.id|| process.env.NEXT_PUBLIC_GUEST_USER_ID;
	const { data: tribesData, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${pageUsername}/${currentUserId}?page=1`,
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

	const tribesToDisplay = tribesData?.tribes?.slice(0, 4);

	return (
		<div className="flex flex-col justify-center">
			<SectionHeader
				name="Tribes"
				classNames="flex-row"
				buttonTitle="Create Tribe"
				pageUsername={pageUsername}
				buttonLink="/create-tribe"
			/>
			<div>
				{
				tribesToDisplay?.length===0 ?
				<NoData message="No Tribes"/>
			:(
				<div>
					{
					tribesToDisplay?.map(
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
									(tribeUser: TribeUser) => tribeUser.userId === currentUserId,
								)}
								userId={currentUserId as string}
								image={profileImage}
								lastVisit={
									tribeVisit.length > 0
										? (tribeVisit[0]?.lastVisit as any)
										: null
								}
							/>
						);
					},
				)
					}
				<div className="flex justify-center items-center text-purple gap-1 cursor-pointer hover:underline w-44 mx-auto dark:text-dark-primary ">
				<Link href={`/user/${pageUsername}/tribes?page=1`}>
					View All Tribes
				</Link>
				<FaArrowRight />
			</div>
				</div>
			)
			}
			</div>
			
		</div>
	);
};

export default Tribes;
