"use client";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import FullTextOnHover from "@/components/FullTextOnHover/index";
import { formatDateTime } from "@/util/DateTime";
import { Badge } from "@/components/ui/badge";
import { Task } from "@prisma/client";

interface TodoDetailsProps {
	sessionParticipants: {}[];
	setIsOpenModal: (val: boolean) => void;
}

const TodoDetails = ({
	description,
	dueDate,
	sessionParticipants,
	setIsOpenModal,
}: TodoDetailsProps & Pick<Task, "description" | "dueDate">) => {
	const { user }: any = useCurrentUser();
	return (
		<div
			className={cn(
				"bg-lighterPink mt-3 rounded-2xl p-2 flex items-center largePhone:justify-between largePhone:flex-row flex-col justify-center",
			)}
		>
			<div className=" flex flex-col gap-1">
				<FullTextOnHover
					text={description as string}
					textClassName="top-0"
					className="largePhone:w-52 w-32"
				/>

				<span className="flex">
					<p>Due: </p>
					<p className="text-purple font-bold">
						{formatDateTime(dueDate as any, user?.timezone).date}
					</p>
				</span>
			</div>
			{sessionParticipants?.length > 0 && (
				<Badge
					className="whitespace-nowrap largePhone:w-28 cursor-pointer pr-2 w-max"
					onClick={() => {
						if (sessionParticipants.length > 0) {
							setIsOpenModal(true);
						}
					}}
				>
					In {sessionParticipants?.length} Sessions
				</Badge>
			)}
		</div>
	);
};

export default TodoDetails;
