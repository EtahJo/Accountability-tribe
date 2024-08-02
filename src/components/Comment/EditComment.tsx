"use client";
import { useTransition } from "react";
import { CreateCommentSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import { edit_comment } from "@/action/comment /edit-comment";
import { toast } from "sonner";
import { mutate } from "swr";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Formsy from "formsy-react";
import CustomInput from "@/components/CustomInput/customInput";

interface EditCommentProps {
	commentId: string;
	comment: string;
	edited: boolean;
	editComment: boolean;
	setEditComment: (val: boolean) => void;
}

const EditComment = ({
	commentId,
	comment,
	edited,
	editComment,
	setEditComment,
}: EditCommentProps) => {
	const [isPending, startTransition] = useTransition();
	const { user }: any = useCurrentUser();

	const onValidSubmit = (vals: z.infer<typeof CreateCommentSchema>) => {
		startTransition(() => {
			edit_comment(vals, commentId).then((data) => {
				if (data?.error) {
					toast.error(data.error);
				}
				if (data.success) {
					setEditComment(false);
					mutate(
						`https://accountability-tribe.vercel.app/user/api/posts/${data.postAuthorUsername}/${user?.id}`,
					);
					mutate(
						`https://accountability-tribe.vercel.app/tribe/api/posts/${data.postTribeId}/${user.id}`,
					);
				}
			});
		});
	};
	return (
		<div className="basis-3/4">
			{editComment ? (
				<Formsy
					className="flex items-center gap-x-2 w-full"
					onValidSubmit={onValidSubmit}
				>
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
						inputClassNames={"p-2 w-[300px]"}
					/>
					<p
						className="cursor-pointer text-sm font-bold"
						onClick={() => setEditComment(false)}
					>
						X
					</p>
				</Formsy>
			) : (
				<div className="largePhone:w-full">
					<p className="lg:text-base text-sm">{comment}</p>
					{edited && <p className=" text-sm  opacity-30">Edited</p>}
				</div>
			)}
		</div>
	);
};

export default EditComment;
