import SectionHeader from "@/components/SectionHeader";
import { FaPlusCircle } from "react-icons/fa";
import UserTasksBody from "./_components/UserTasksBody";
import { currentUser } from "@/lib/authentication";

const UserTasks = async ({ params }: { params: { username: string } }) => {
	const { username } = params;
	const user = await currentUser();
	if (user?.username !== username) {
		return <div>You are not authorised to view this page</div>;
	}
	return (
		<div className="px-20 mt-16 min-[640px]:mt-0 ">
			<SectionHeader
				name={`${username}'s Uncompleted Tasks`}
				buttonLink="/create-task"
				buttonTitle="Create Task"
				buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
				pageUsername={username}
				classNames="col-start-2 col-end-12"
			/>
			<UserTasksBody username={username} />
		</div>
	);
};

export default UserTasks;
