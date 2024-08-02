"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { CreateCommentSchema } from "@/schemas/index";
import Formsy from "formsy-react";
import CustomInput from "@/components/CustomInput/customInput";
import { Button } from "@/components/ui/button";
import { FaPaperPlane } from "react-icons/fa";
import { create_comment } from "@/action/comment /create-comment";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { mutate } from "swr";

const CommentForm = ({ postId }: { postId: string }) => {
	const [comment, setComment] = useState("");
	const [isPending, startTransition] = useTransition();
	const { user }: any = useCurrentUser();
	const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
		startTransition(() => {
			create_comment(vals, postId).then((data) => {
				if (data.error) {
					toast.error(data.error);
				}
				if (data.success) {
					setComment("");
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/posts/${data.postAuthorUsername}/${user?.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postTribeId}/${user.id}`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/tribe/api/posts/${data.postAuthorUsername}/post-edits`,
					);
					mutate(
						`${process.env.NEXT_PUBLIC_BASE_URL}/user/api/tribes/${user.username}/user-is-tribe-admin/${data.postTribeId}`,
					);
				}
			});
		});
	};
	return (
		<div>
			<Formsy onValidSubmit={onValidSubmit}>
				<CustomInput
					name="content"
					value={comment}
					disabled={isPending}
					placeholder="React to post (Be Positive)"
					Icon={
						<Button type="submit" disabled={isPending}>
							<FaPaperPlane />
						</Button>
					}
					inputClassNames={"p-2"}
				/>
			</Formsy>
		</div>
	);
};

export default CommentForm;
