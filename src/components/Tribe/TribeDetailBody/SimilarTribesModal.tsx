"use client";
import { useState } from "react";
import ModalWrapper from "@/components/ModalWrap";
import TribeSkeleton from "@/components/Skeletons/TribeSkeleton";
import TribeSnippet from "@/components/Tribe/TribeSnippet/index";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TribeUser, TribeVisit, Tribe} from "@prisma/client";
import NoData from "@/components/NoData";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const SimilarTribesModal = ({ tribeId }: { tribeId: string }) => {
	const [openModal, setOpenModal] = useState(false);
	const { user }: any = useCurrentUser();
	const { data: similarTribes, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${tribeId}/similar-tribes`,
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
			<Button
				variant={"outline"}
				className="min-[923px]:hidden absolute 
        -top-8 text-lightPink shadow-3xl right-2"
				onClick={() => setOpenModal(true)}
			>
				View Similar Tribes
			</Button>
			<ModalWrapper
				isOpen={openModal}
				onRequestClose={() => setOpenModal(false)}
				className="w-max"
				modalHeader="Similar Tribes"
			>
				<div className="bg-purple p-3 rounded-3xl shadow-3xl w-[320px] relative">
					<p
						className="absolute top-0 right-3 font-bold m-2 "
						onClick={() => setOpenModal(false)}
					>
						X
					</p>
					<div>
						{
				similarTribes?.tribes?.length ===0?
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
										userId={user.id}
									/>
								</div>
							),
						)}
					</div>
				</div>
			</ModalWrapper>
		</div>
	);
};

export default SimilarTribesModal;
