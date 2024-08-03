"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import UpcomingSessions from "@/components/UpcomingSessions/index";
import TodoList from "@/components/TodoList/index";
import UserPosts from "@/components/Posts/UserPosts";
import Achievements from "@/components/Achievements/index";
import Tribes from "@/components/Tribes/index";
import UserPostsModal from "@/components/Posts/UserPostsModal";

interface UserProfileBodyProps {
	pageUserName: string;
}

const UserProfileBody = ({ pageUserName }: UserProfileBodyProps) => {
	const { user }: any = useCurrentUser();

	return (
		<div className="grid grid-cols-12 pb-24 largePhone:px-20 px-5">
			<div className="xl:col-start-1 xl:col-end-9 col-start-1 col-end-12 p-10">
				<UpcomingSessions pageUsername={pageUserName} />
				{pageUserName === user?.username && (
					<TodoList pageUsername={pageUserName} />
				)}
				<UserPostsModal pageUsername={pageUserName} />
				<div className="min-[508px]:block hidden ">
					<UserPosts pageUsername={pageUserName} />
				</div>
			</div>
			<div className="xl:col-start-10 xl:col-end-12  col-start-1 col-end-12 flex justify-around xl:flex-col flex-row xl:justify-start flex-wrap gap-4">
				<Achievements pageUsername={pageUserName} />
				<Tribes pageUsername={pageUserName} />
			</div>
		</div>
	);
};

export default UserProfileBody;
