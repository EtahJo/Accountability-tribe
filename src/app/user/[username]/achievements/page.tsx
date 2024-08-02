import SectionHeader from "@/components/SectionHeader/index";
import { FaPlusCircle } from "react-icons/fa";
import UserAchievementsBody from "./_components/UserAchievementsBody";

const UserAchievements = async ({
	params,
}: { params: { username: string } }) => {
	const { username } = params;
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name={"Your Achievements"}
				buttonLink="/create-task"
				buttonTitle="Create Task"
				buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
				pageUsername={username}
				classNames="col-start-2 col-end-12"
			/>
			<UserAchievementsBody username={username} />
		</div>
	);
};

export default UserAchievements;
