import SectionHeader from "@/components/SectionHeader";
import UserTribesBody from "./_components/UserTribesBody";

const UserTribes = ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const decodedUsername= decodeURIComponent(username)
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name={`${decodedUsername}'s Tribes`}
				buttonLink="/create-tribe"
				buttonTitle="Create Tribe"
				pageUsername={decodedUsername}
				classNames="col-start-2 col-end-12"
			/>
			<UserTribesBody pageUsername={decodedUsername} />
		</div>
	);
};

export default UserTribes;
