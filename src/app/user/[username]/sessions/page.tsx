import GetAllSessions from "@/components/GetAllSessions/index";
import SectionHeader from "@/components/SectionHeader";
import { FaPlusCircle } from "react-icons/fa";

const UserSessions = async ({ params }: { params: { username: string } }) => {
	const { username } = params;

	return (
		<div className="px-20 min-[640px]:mt-0 mt-16">
			<SectionHeader
				name="Upcoming Work or Study Sessions"
				buttonLink="/create-session"
				buttonTitle="Create Session"
				buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
				pageUsername={username}
				classNames="col-start-2 col-end-12"
			/>
			<GetAllSessions username={username} />
		</div>
	);
};

export default UserSessions;
