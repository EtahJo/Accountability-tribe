"use client";
import { useState, useTransition } from "react";
import Formsy from "formsy-react";
import CustomInput from "@/components/CustomInput/customInput";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { mutate } from "swr";
import { CreatePostSchema } from "@/schemas/index";
import { create_post } from "@/action/post/create-post";
import { FormError } from "@/components/Messages/Error";
import { FormSuccess } from "@/components/Messages/Success";
import { useCurrentUser } from "@/hooks/use-current-user";

const PostForm = ({ tribeId }: { tribeId: string }) => {
	const [isPending, startTransition] = useTransition();
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const { user }: any = useCurrentUser();
	const onValidSubmit = (vals: z.infer<typeof CreatePostSchema>) => {
		startTransition(() => {
			create_post(vals, tribeId).then((data) => {
				if (data.error) {
					setSuccess("");
					setError(data.error);
				}
				if (data.success) {
					setError("");
					setSuccess(data.success);
					if (data.approved) {
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`,
						);
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${tribeId}/${user.id}`,
						);
					} else {
						mutate(
							`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${tribeId}`,
						);
					}
				}
			});
		});
	};
	return (
		<div className="bg-white rounded-2xl shadow-3xl p-5 mb-5 md:w-full w-max">
			<Formsy onValidSubmit={onValidSubmit}>
				<CustomInput
					lable="What's your post about?"
					placeholder="My daily challenge.."
					name="title"
					required
					disabled={isPending}
					value={title}
					maxLength={30}
				/>
				<CustomInput
					lable="What's on your mind?"
					placeholder="I am having a challenge with.."
					name="content"
					required
					textArea
					disabled={isPending}
					value={content}
				/>
				{error && <FormError message={error} />}
				{success && <FormSuccess message={success} />}
				<Button
					size={"slg"}
					className="py-3 move-button"
					disabled={isPending}
					type="submit"
				>
					{isPending ? "Creating" : "Post"}
				</Button>
			</Formsy>
		</div>
	);
};

export default PostForm;
