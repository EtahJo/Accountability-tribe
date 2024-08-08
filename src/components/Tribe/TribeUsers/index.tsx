"use client";
import ModalWrapper from "@/components/ModalWrap/index";

import { Props } from "react-modal";
import TribeUser from "./TribeUser";
interface TribeUsersProps {
	tribeName: string;
	tribeId: string;
	users: {
		user: { username: string; image: string; id:string };
		userRole: string;
		adminsUserIds: string[];
		userId: string;
	}[];
}
const TribeUsers = ({
	isOpen,
	onRequestClose,
	users,
	tribeName,
	tribeId,
}: Props & TribeUsersProps) => {

	return (
		<ModalWrapper
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Tribe Users"
			className={"w-max"}
		>
			<div className="m-2 bg-white rounded-3xl shadow-3xl dark:bg-dark-lightBackground dark:border dark:border-slate-800">
				<h1
					className="text-xl w-full text-center font-bold
         bg-purple p-2 rounded-2xl shadow-3xl mb-3 text-white dark:bg-dark-primary"
				>
					{tribeName} Members
				</h1>
				{users.map((user) => (
					<TribeUser
						key={user.userId}
						name={user.user.username}
						profileImage={user.user.image}
						isAdmin={user.adminsUserIds.includes(user.user.id)}
						adminsUserIds={user.adminsUserIds}
						userId={user.userId}
						tribeId={tribeId}
						users={users}
					/>
				))}
			</div>
		</ModalWrapper>
	);
};
export default TribeUsers;
