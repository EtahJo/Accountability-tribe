"use client";
import ModalWrapper from "@/components/ModalWrap/index";
import { Props } from "react-modal";
import Comment from "@/components/Comment/index";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CommentsModalProps {
	comments: {
		author: { username: string; image: string };
		content: string;
		authorId: string;
		id: string;
		edited: boolean;
		createdAt: string;
		commentId: string;
		commentLiked: boolean;
		likes: { user: { username: string; image: string; id: string } }[];
		parentId: string;
		commentLikes: { user: { username: string; image: string } }[];
		replies: {
			author: { username: string; image: string };
			content: string;
			id: string;
			edited: boolean;
			createdAt: string;
			authorId: string;
			likes: { user: { username: string; image: string; id: string } }[];
			parentId: string;
			replies: {
				author: { username: string; image: string };
				content: string;
				id: string;
				createdAt: string;
				likes: { user: { username: string; image: string; id: string } }[];
				parentId: string;
			}[];
		}[];
	}[];
	isAdmin: boolean;
}
const CommentsModal = ({
	isOpen,
	onRequestClose,
	comments,
	isAdmin,
}: Props & CommentsModalProps) => {
	const { user } = useCurrentUser();
	return (
		<ModalWrapper
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className=" w-max"
		>
			<div className="bg-white p-5 rounded-3xl shadow-3xl dark:bg-dark-lightBackground dark:border dark:border-slate-800">
				{comments?.map(
					(comment) =>
						!comment.parentId && (
							<Comment
								key={comment?.id}
								authorUsername={comment?.author?.username}
								profileImage={comment?.author?.image}
								comment={comment?.content}
								createdAt={comment.createdAt}
								commentLiked={comment.likes?.some(
									(like) => like.user.id === user?.id,
								)}
								commentLikes={comment.likes}
								commentId={comment.id}
								replies={comment.replies as any}
								edited={comment.edited}
								authorId={comment?.authorId}
								isAdmin={isAdmin}
							/>
						),
				)}
			</div>
		</ModalWrapper>
	);
};

export default CommentsModal;
