"use client";
import { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import { EditSessionSchema } from "@/schemas";
import { mutate } from "swr";
import Formsy from "formsy-react";
import Custominput from "@/components/CustomInput/customInput";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import { Button } from "@/components/ui/button";
import { edit_session_goal } from "@/action/session/edit-session-goal";

interface SessionNewTitleFormProps {
	goal: string;
	sessionId: string;
	doneFunction: () => void;
}

const SessionNewTitleForm = ({
	goal,
	sessionId,
	doneFunction,
}: SessionNewTitleFormProps) => {
	const [isPending, startTransition] = useTransition();
	const { user }: any = useCurrentUser();
	const [newGoal, setNewGoal] = useState(goal);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const onValidSubmit = (vals: z.infer<typeof EditSessionSchema>) => {
		startTransition(async () => {
			edit_session_goal(vals, sessionId)
				.then((data) => {
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
					if (data.error) {
						setSuccess("");
						setError(data.error);
					}
				})
				.catch(() => {
					setSuccess("");
					setError("Something went wrong!");
				});
		});

		// setEditGoal(false);
	};
	return (
		<Formsy
			className="flex flex-col gap-y-2 justify-center items-center"
			onValidSubmit={onValidSubmit}
		>
			<Custominput
				textArea
				name="goal"
				value={newGoal}
				placeholder="What's your new goal?"
				className="w-[300px]"
				disabled={isPending}
			/>
			{error && <FormError message={error} />}
			{success && <FormSuccess message={success} />}
			<Button
				type="submit"
				className="move-button"
				disabled={isPending}
				size={"slg"}
			>
				Update
			</Button>
			<Button
				type="button"
				className="move-button"
				onClick={doneFunction}
				disabled={isPending}
				size={"slg"}
			>
				Done
			</Button>
		</Formsy>
	);
};

export default SessionNewTitleForm;
