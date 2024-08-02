"use client";
import { useState, useTransition } from "react";
import * as z from "zod";
import Formsy from "formsy-react";
import Custominput from "@/components/CustomInput/customInput";
import { create_tribe } from "@/action/tribe/create-tribe";
import UploadImage from "@/components/UploadImage/index";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import { CreateTribeSchema } from "@/schemas/index";
import { mutate } from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import CustomTagsInput from "@/components/CustomTagsInput/index";

const CreateTribe = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isPending, startTransition] = useTransition();
	const [tags, setTags] = useState(new Set());
	const { user }: any = useCurrentUser();

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
	const onValidSubmit = (vals: z.infer<typeof CreateTribeSchema>) => {
		startTransition(() => {
			create_tribe(vals).then((data) => {
				if (data?.error) {
					setSuccess("");
					setError(data.error);
				}
				if (data.success) {
					setError("");
					setSuccess(data.success);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${data.creatorUsername}/${user.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/${user.id}/${data.tribeId}/similar-tribes`,
					);
				}
			});
		});
	};
	return (
		<div className="h-max min-[640px]:mt-0 mt-16">
			<div className="flex justify-center items-center flex-col gap-y-4  ">
				<h1
					className="text-center largePhone:text-5xl font-semibold largePhone:mb-24 mb-14
         text-shadow-lg text-3xl"
				>
					Create Tribe
				</h1>
				<div
					className="bg-white rounded-3xl shadow-3xl largePhone:w-[400px] 
        largePhone:p-10 w-[280px] p-5 flex flex-col items-center"
				>
					<Formsy onValidSubmit={onValidSubmit}>
						<UploadImage name="profileImage" />
						<Custominput
							lable="Tribe Name"
							name="name"
							required
							disabled={isPending}
							placeholder="Add Tribe Name"
							value={name}
						/>
						<Custominput
							lable="Tribe Description"
							textArea
							disabled={isPending}
							name="description"
							placeholder="Tell people what the tribe is about"
							value={description}
						/>
						<CustomTagsInput
							name="tags"
							lable="Select  atleast 2 Tribe Tags"
							value={tagsArray}
							addTag={addTag}
							handleRemoveFxn={handleRemove}
							availableTags={availableTags}
						/>
						{error && <FormError message={error} />}
						{success && <FormSuccess message={success} />}
						<Button
							type="submit"
							className="move-button py-3 my-3"
							size={"slg"}
							disabled={isPending}
						>
							Create Tribe
						</Button>
					</Formsy>
				</div>
			</div>
		</div>
	);
};

export default CreateTribe;
