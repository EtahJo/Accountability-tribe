"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { create_comment_like } from "@/action/like/create-like";
import { delete_comment_like } from "@/action/like/delete-like";
import { toast } from "sonner";
import { mutate } from "swr";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import LikeModal from "@/components/Posts/LikeModal";

interface CommentLikeSectionProps {
	commentLiked: boolean;
	commentId: string;
	commentLikes: {}[];
}

const CommentLikeSection = ({
	commentLiked,
	commentId,
	commentLikes,
}: CommentLikeSectionProps) => {
	const [like, setLike] = useState(commentLiked);
	const [openLikeModal, setOpenLikeModal] = useState(false);
	const { user }: any = useCurrentUser();
	const LikeComment = () => {
		if (!commentLiked) {
			setLike(true);
			create_comment_like(commentId).then((data) => {
				if (data?.error) {
					toast.error(data?.error);
				}
				if (data.success) {
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
		}
	};
	const deleteCommentLike = () => {
		setLike(false);
		delete_comment_like(commentId).then((data) => {
			if (data.error) {
				toast.error(data.error);
			}
			if (data.success) {
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
	};
	return (
		<div className="flex items-center gap-2">
			<Button
				onClick={commentLiked ? deleteCommentLike : LikeComment}
				className="move-button"
				size={"sm"}
			>
				{like ? (
					<div>
						<FaThumbsUp className="text-purple cursor-pointer peer" size={15} />
						<p
							className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-3
     left-3 hidden peer peer-hover:block text-black"
						>
							Liked
						</p>
					</div>
				) : (
					<div className="relative">
						<FaRegThumbsUp
							className="text-purple cursor-pointer peer"
							size={15}
						/>
						<p
							className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-3
     left-3 hidden peer peer-hover:block text-black"
						>
							Like
						</p>
					</div>
				)}
			</Button>
			{commentLikes?.length > 0 && (
				<p
					className="text-purple cursor-pointer whitespace-nowrap largePhone:text-base text-xs"
					onClick={() => setOpenLikeModal(true)}
				>
					{commentLikes.length} {commentLikes.length > 1 ? "Likes" : "Like"}
				</p>
			)}
			<LikeModal
				isOpen={openLikeModal}
				onRequestClose={() => setOpenLikeModal(false)}
				likes={commentLikes as any}
			/>
		</div>
	);
};

export default CommentLikeSection;
