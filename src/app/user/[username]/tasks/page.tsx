import SectionHeader from "@/components/SectionHeader";
import { FaPlusCircle } from "react-icons/fa";
import UserTasksBody from "./_components/UserTasksBody";
import { currentUser } from "@/lib/authentication";

const UserTasks = async ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const decodedUsername = decodeURIComponent(username)
	const user = await currentUser();
	if (user?.username !== decodedUsername) {
		return <div>You are not authorised to view this page</div>;
	}
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name={`${decodedUsername}'s Uncompleted Tasks`}
				buttonLink="/create-task"
				buttonTitle="Create Task"
				pageUsername={decodedUsername}
				classNames="col-start-2 col-end-12"
			/>
			<UserTasksBody username={decodedUsername} />
		</div>
	);
};

export default UserTasks;
