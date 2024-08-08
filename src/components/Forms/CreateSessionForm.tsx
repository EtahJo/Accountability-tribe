"use client";

import { useState, useTransition } from "react";
import useSWR from "swr";
import * as z from "zod";

import CustomInput from "@/components/CustomInput/customInput";
import CustomDateInput from "@/components/CustomDateInput/index";
import FormSkeleton from "../Skeletons/FormSkeleton";
import { create_session } from "@/action/session/create-session";
import { CreateSessionSchema } from "@/schemas/index";
import { FaLink, FaCalendar, FaBaseballBall, FaTasks } from "react-icons/fa";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import Duration from "@/components/DurationInput/index";
import { addHours, addMinutes } from "date-fns";
import { useCurrentUser } from "@/hooks/use-current-user";
import Formsy from "formsy-react";
import { Button } from "@/components/ui/button";
import { mutate } from "swr";
import { create_google_meeting_link } from "@/action/session/create_google_meeting_link";
import SelectTasks from "@/components/CustomMultipleSelectInput/SelectTasks";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const CreateSessionForm = () => {
	const { user }: any = useCurrentUser();
	const { data: tasks,isLoading } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${user.username}/uncompleted?page=1`,
		fetcher,
	);

	const [isPending, startTransition] = useTransition();
	const [goal, setGoal] = useState("");
	const [startDateTime, setStartDateTime] = useState<Date>();
	const [endDateTime, setEndDateTime] = useState<Date>();
	const [meetingLink, setMeetingLink] = useState("");
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	if(isLoading|| tasks===undefined){
		return (<FormSkeleton/>)
	}

	const onValidSubmit = async (vals: z.infer<typeof CreateSessionSchema>) => {
		startTransition(async () => {
			create_session(vals)
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
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tasks/${data.creatorUsername}/uncompleted?page=1`,
						);
					}
				})
				.catch((error) => {
					setSuccess("");
					setError("Something went wrong");
				});

			// create_google_meeting_link(vals,)
		});
	};
	return (
		<Formsy
			className="flex justify-center flex-col items-center"
			onValidSubmit={onValidSubmit}
		>
			<div className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-10  md:w-[600px] w-[310px] dark:bg-dark-lightBackground dark:border dark:border-slate-900 ">
				<CustomInput
					lable="Session Title"
					labelIcon={<FaBaseballBall className="text-purple dark:text-dark-primary" />}
					name="goal"
					value={goal}
					required
					disabled={isPending}
					placeholder="What is the session Title ?"
					maxLength={30}
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

				<SelectTasks
					lable="Add Tasks to work on"
					labelIcon={<FaTasks className="text-purple dark:text-dark-primary" />}
					name="taskIds"
					options={tasks.tasks as { id: string; title: string }[]}
				/>
			</div>
			<div
				className=" bg-white rounded-5xl px-10 py-10 shadow-3xl my-5 relative  flex justify-center 
           md:w-[600px] w-[310px] flex-col gap-5  dark:bg-dark-lightBackground dark:border dark:border-slate-800"
			>
				{endDateTime && startDateTime && (
					<Duration
						startDateTime={startDateTime.toISOString()}
						endDateTime={endDateTime.toISOString()}
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
				<div className="flex justify-center mt-5">
					<Button
						type="submit"
						className="rounded-3xl"
						disabled={isPending}
						size="lg"
						variant={"primary"}
					>
						Create Session
					</Button>
				</div>
			</div>
		</Formsy>
	);
};

export default CreateSessionForm;
