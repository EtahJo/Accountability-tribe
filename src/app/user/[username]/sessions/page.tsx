import GetAllSessions from "@/components/GetAllSessions/index";
import SectionHeader from "@/components/SectionHeader";

const UserSessions = async ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const decodedUsername= decodeURIComponent(username)

	return (
		<div className="px-20 min-[640px]:mt-0 mt-16">
			<SectionHeader
				name="Upcoming Work or Study Sessions"
				buttonLink="/create-session"
				buttonTitle="Create Session"
				pageUsername={decodedUsername}
				classNames="col-start-2 col-end-12"
			/>
			<GetAllSessions username={decodedUsername} />
		</div>
	);
};

export default UserSessions;
