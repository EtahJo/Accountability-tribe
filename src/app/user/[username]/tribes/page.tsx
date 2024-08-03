import SectionHeader from "@/components/SectionHeader";
import { FaPlusCircle } from "react-icons/fa";
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
				buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
				pageUsername={decodedUsername}
				classNames="col-start-2 col-end-12"
			/>
			<UserTribesBody pageUsername={decodedUsername} />
		</div>
	);
};

export default UserTribes;
