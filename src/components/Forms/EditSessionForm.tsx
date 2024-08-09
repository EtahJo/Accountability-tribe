"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import Formsy from "formsy-react";

import CustomInput from "@/components/CustomInput/customInput";
import DurationInput from "@/components/DurationInput/index";
import CustomDateInput from "@/components/CustomDateInput/index";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import { Button } from "@/components/ui/button";
import ToolTip from "@/components/ToolTip/index";
import { edit_session } from "@/action/session/edit-session";
import { remove_task_from_session } from "@/action/task/remove-task-from-session";
import { cn } from "@/lib/utils";
import FormSkeleton from "@/components/Skeletons/FormSkeleton";
import { toast } from "sonner";

import { FaBaseballBall, FaLink, FaCalendar, FaTasks } from "react-icons/fa";
import { EditSessionSchema } from "@/schemas/index";
import { addHours, addMinutes } from "date-fns";
import SelectTasks from "@/components/CustomMultipleSelectInput/SelectTasks";
import Todo from "@/components/TodoList/Todo";
import useSWR, { mutate } from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Session, Task } from "@prisma/client";

interface EditSessionProps {
	session: Session & { tasks: Task[] };
	sessionTasks: {}[];
	sessionParticipantId: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditSessionForm = ({
	session,
	sessionTasks,
	sessionParticipantId,
}: EditSessionProps) => {
	const { user }: any = useCurrentUser();
	const { data: tasks, isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${user.username}/uncompleted?page=1`,
		fetcher,
	);
	const [isPending, startTransition] = useTransition();
	const [goal, setGoal] = useState(session?.goal || undefined);
	const [startDateTime, setStartDateTime] = useState<Date>(
		new Date(session?.startDateTime as Date) || undefined,
	);
	const [endDateTime, setEndDateTime] = useState<Date>(
		new Date(session?.endDateTime as Date) || undefined,
	);
	const [meetingLink, setMeetingLink] = useState(
		session?.meetingLink || undefined,
	);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	if (isLoading || tasks === undefined) {
		return <FormSkeleton />;
	}
	const goodToAddTasks = tasks.tasks?.filter(
		(task: any) =>
			!sessionTasks?.some((task1: any) => task.id === task1.taskId),
	);
	const unCompletedTasks = sessionTasks?.length === 0 ? tasks.tasks : goodToAddTasks;
	const removeTaskFromSession = (taskId: string) => {
		startTransition(() => {
			remove_task_from_session(taskId, sessionParticipantId).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/sessions/api/${user.id}/${session.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted`,
					);
				}
			});
		});
	};
	const onValidSubmit = (vals: z.infer<typeof EditSessionSchema>) => {
		startTransition(() => {
			edit_session(vals, session?.id as string)
				.then((data) => {
					if (data.error) {
						setSuccess("");
						setError(data.error);
					}
					if (data.success) {
						setError("");
						setSuccess(data.success);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${user.username}/closest-session`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/sessions/${data.creatorUsername}/${user.id}?page=1`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted`,
						);
					}
				})
				.catch((error) => {
					setSuccess("");
					setError("Something went wrong");
				});
		});
	};
	return (
		<Formsy
			onValidSubmit={onValidSubmit}
			className="flex justify-center flex-col items-center"
		>
			<div className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-10  md:w-[600px] w-[310px]
			dark:bg-dark-lightBackground dark:border dark:border-slate-800 ">
				<CustomInput
					lable="Session Goal"
					labelIcon={<FaBaseballBall className="text-purple dark:text-dark-primary" />}
					name="goal"
					value={goal}
					required
					disabled={isPending}
					maxLength={30}
					placeholder="What is the goal for this session ?"
				/>
				<CustomInput
					lable="Link to Scheduled Meeting"
					labelIcon={<FaLink className="text-purple dark:text-dark-primary" />}
					name="meetingLink"
					value={meetingLink}
					required
					disabled={isPending}
					placeholder="Add link to meeting"
				/>
				<div>
					<h1 className="font-bold text-center">Session Tasks</h1>
					<div className="flex flex-col justify-center items-center">
						{sessionTasks?.map(({ task }: any) => (
							<div key={task.id} className="flex items-center relative">
								<Todo
									title={task.title}
									priority={task.priority}
									description={task.description}
									status={task.status}
									id={task.id}
									dueDate={task.dueDate}
									sessionParticipants={task.sessionParticipants}
									taskId={task.id}
									userId={task.userId}
									pageUsername={user.username}
								/>
								<ToolTip
									trigger={
										<Button
											type="button"
											className={cn(
												"font-bold absolute top-0 right-0 hover:text-purple",
												isPending ? "opacity-50" : "opacity-100",
											)}
											variant={"ghost"}
											size="sm"
											onClick={() => removeTaskFromSession(task.id)}
										>
											X
										</Button>
									}
								>
									Remove task from session
								</ToolTip>
							</div>
						))}
					</div>
				</div>
				<SelectTasks
					lable="Add Tasks to work on"
					labelIcon={<FaTasks className="text-purple dark:text-dark-primary" />}
					name="taskIds"
					options={unCompletedTasks as { id: string; title: string }[]}
				/>
			</div>

			<div
				className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-5 relative  flex justify-center 
   md:w-[600px] w-[310px] flex-col gap-5 dark:bg-dark-lightBackground dark:border dark:border-slate-800"
			>
				{endDateTime && startDateTime && (
					<DurationInput
						startDateTime={startDateTime?.toISOString()}
						endDateTime={endDateTime?.toISOString()}
						name="duration"
						hours={hours}
						minutes={minutes}
						changeHour={(e: React.ChangeEvent<HTMLInputElement>) => {
							setError("");
							setHours(parseInt((e.target as HTMLInputElement).value, 10));
							const newHour = parseInt(
								(e.target as HTMLInputElement).value,
								10,
							);
							if (isNaN(newHour)) {
								// setError('Please Enter Number for Duration');
								return;
							} else {
								setEndDateTime(addHours(startDateTime, newHour));
							}
						}}
						changeMinutes={(e: React.ChangeEvent<HTMLInputElement>) => {
							setError("");
							setMinutes(parseInt((e.target as HTMLInputElement).value, 10));
							const newMinutes = parseInt(
								(e.target as HTMLInputElement).value,
								10,
							);
							if (isNaN(newMinutes)) {
								// setError('Please Enter Number for Duration');
								return;
							} else {
								setEndDateTime(addMinutes(startDateTime, newMinutes));
							}
						}}
					/>
				)}

				<CustomDateInput
					lable="Start and End Date and Time"
					labelIcon={<FaCalendar className="text-purple dark:text-dark-primary" />}
					className="w-[250px]"
					required
					name="startEndDateTime"
					value={{ startDateTime, endDateTime }}
					startDateTime={startDateTime}
					endDateTime={endDateTime}
					disabled={isPending}
					onChangeStart={(date) => {
						setStartDateTime(date);
					}}
					onChangeEnd={(date) => {
						setEndDateTime(date);
					}}
				/>

				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
			</div>

			<div className="flex justify-center mt-5">
				<Button
					type="submit"
					className="rounded-3xl"
					disabled={isPending}
					size="lg"
					variant={"primary"}
				>
					Edit Session
				</Button>
			</div>
		</Formsy>
	);
};

export default EditSessionForm;
