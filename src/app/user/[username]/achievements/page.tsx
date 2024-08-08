import SectionHeader from "@/components/SectionHeader/index";
import UserAchievementsBody from "./_components/UserAchievementsBody";

const UserAchievements = async ({
	params,
}: { params: { username: string } }) => {
	const { username } = params;
	const decodedUsername = decodeURIComponent(username)
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name={"Your Achievements"}
				buttonLink="/create-task"
				buttonTitle="Create Task"
				pageUsername={decodedUsername}
				classNames="col-start-2 col-end-12"
			/>
			<UserAchievementsBody username={decodedUsername} />
		</div>
	);
};

export default UserAchievements;
