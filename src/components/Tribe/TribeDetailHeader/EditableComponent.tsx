"use client";
import { useState, useTransition } from "react";
import CustomInput from "@/components/CustomInput/customInput";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { edit_tribe } from "@/action/tribe/edit-tribe";
import { useCurrentUser } from "@/hooks/use-current-user";
import { mutate } from "swr";
import { toast } from "sonner";
import Formsy from "formsy-react";
import { EditTribeSchema } from "@/schemas/index";
import * as z from "zod";

interface EditableComponentProps {
	text: string;
	editTrigger: React.ReactNode;
	name: string;
	textClass?: string;
	cancelTrigger: React.ReactNode;
	showEditOption?: boolean;
	tribeId: string;
	textArea?: boolean;
	divClasses?: string;
}

const EditableComponent = ({
	text,
	editTrigger,
	name,
	cancelTrigger,
	showEditOption,
	textClass,
	tribeId,
	textArea,
	divClasses,
}: EditableComponentProps) => {
	const { user }: any = useCurrentUser();
	const [edit, setEdit] = useState(false);
	const [isPending, startTransition] = useTransition();
	const onValidSubmit = (vals: z.infer<typeof EditTribeSchema>) => {
		startTransition(() => {
			edit_tribe(vals, tribeId).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					toast.success(data.success);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.tribeId}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/recommended-tribes/${user.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
					);
				}
			});
		});
	};
	return (
		<div
			className={cn(
				divClasses
					? divClasses
					: "flex items-center m-auto gap-x-2 justify-center",
			)}
		>
			{showEditOption && edit ? (
				<Formsy
					className="bg-white flex items-center px-2 rounded-2xl gap-x-2
          largePhone:flex-row flex-col 
          "
					onValidSubmit={onValidSubmit}
				>
					<CustomInput
						name={name}
						value={text}
						disabled={isPending}
						textArea={textArea}
					/>
					<Button type="submit" disabled={isPending}>
						Edit
					</Button>
				</Formsy>
			) : (
				<p className={cn(textClass)}>{text}</p>
			)}
			{showEditOption && (
				<div onClick={() => setEdit(!edit)}>
					{edit ? cancelTrigger : editTrigger}
				</div>
			)}
		</div>
	);
};

export default EditableComponent;
