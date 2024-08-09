"use client";
import { useState, useTransition } from "react";
import * as z from "zod";
import { mutate } from "swr";
import { EditTribeSchema } from "@/schemas/index";
import { edit_tribe } from "@/action/tribe/edit-tribe";
import { useCurrentUser } from "@/hooks/use-current-user";
import ModalWrapper from "@/components/ModalWrap/index";
import Formsy from "formsy-react";
import UploadImage from "@/components/UploadImage/index";
import CustomInput from "@/components/CustomInput/customInput";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import CustomTagsInput from "@/components/CustomTagsInput/index";
import { Props } from "react-modal";

interface EditTribeModalFormProps {
	tribeName: string;
	tribeDescription: string;
	tribeTags?: Set<string>;
	tribeId: string;
	profileImage: string;
}

const EditTribeModalForm = ({
	tribeDescription,
	tribeName,
	tribeTags,
	tribeId,
	isOpen,
	profileImage,
	onRequestClose,
}: Props & EditTribeModalFormProps) => {
	const { user }: any = useCurrentUser();
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isPending, startTransition] = useTransition();
	const [tags, setTags] = useState(tribeTags || new Set());

	const addTag = (tag: any) => {
		setTags(new Set(tags).add(tag));
	};
	const handleRemove = (item: any) => {
		const newItems = new Set(tags);
		newItems.delete(item);
		setTags(newItems);
	};
	const tagsArray = Array.from(tags);
	const availableTags = [
		{
			id: 1,
			text: "Study",
		},
		{
			id: 2,
			text: "Fitness",
		},
		{
			id: 3,
			text: "Spiritual",
		},
		{
			id: 7,
			text: "Dieting",
		},
		{
			id: 4,
			text: "Software development",
		},

		{
			id: 5,
			text: "Self Development",
		},
		{
			id: 6,
			text: "Book Club",
		},
	];

	const onValidSubmit = (vals: z.infer<typeof EditTribeSchema>) => {
		startTransition(() => {
			edit_tribe(vals, tribeId).then((data) => {
				if (data?.error) {
					setSuccess("");
					setError(data.error);
				}
				if (data.success) {
					setError("");
					setSuccess(data.success);
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
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
					);
				}
			});
		});
	};
	return (
		<ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
			<Formsy
				className="bg-white rounded-3xl shadow-3xl p-5 mt-44 dark:bg-dark-lightBackground dark:border dark:border-slate-800"
				onValidSubmit={onValidSubmit}
			>
				<UploadImage name="profileImage" presentImage={profileImage} />
				<CustomInput
					lable="Tribe Name"
					name="name"
					required
					disabled={isPending}
					placeholder="Add Tribe Name"
					value={tribeName}
					maxLength={30}
				/>
				<CustomInput
					lable="Tribe Description"
					textArea
					disabled={isPending}
					name="description"
					placeholder="Tell people what the tribe is about"
					value={tribeDescription}
					maxLength={100}
				/>
				<CustomTagsInput
					name="tags"
					lable="Select  atleast 2 Tribe Tags"
					value={tagsArray}
					addTag={addTag}
					handleRemoveFxn={handleRemove}
					availableTags={availableTags}
					presentTags={tribeTags}
				/>
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
				<div className="flex items-center justify-between mt-5">
					<Button type="submit" className="move-button">
						Save Edit
					</Button>
					<Button
						type="button"
						className="move-button"
						variant={'secondary'}
						onClick={onRequestClose}
					>
						Discard Changes
					</Button>
				</div>
			</Formsy>
		</ModalWrapper>
	);
};

export default EditTribeModalForm;
