"use client";
import CommentForm from "../Forms/CommentForm";
import CommentSnippet from "../Comment";
import { Comment, User } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

type OneCommentProps = Pick<
	Comment,
	"authorId" | "content" | "createdAt" | "edited" | "id" | "parentId"
> & {
	likes: { user: Pick<User, "username" | "id" | "image"> }[];
	author: Pick<User, "username" | "image">;
	replies: OneCommentProps[];
};

interface PostCommentSectionProps {
	comments: OneCommentProps[];
	isAdmin: boolean;
	postId: string;
}

const PostCommentSection = ({
	comments,
	isAdmin,
	postId,
}: PostCommentSectionProps) => {
	const { user }: any = useCurrentUser();
	const firstFiveComments = comments.slice(0, 2);
	return (
		<div className="flex flex-col ">
			<div className="largePhone:m-0 m-auto ">
				<CommentForm postId={postId} />
			</div>

			{comments.length > 0 && (
				<div className="bg-gray-100 p-3 rounded-2xl ">
					{firstFiveComments.map(
						(comment) =>
							!comment.parentId && (
								<CommentSnippet
									key={comment.id}
									profileImage={comment.author.image as string}
									authorUsername={comment.author.username as string}
									comment={comment.content}
									createdAt={comment.createdAt as any}
									commentLiked={comment.likes?.some(
										(like) => like.user.id === user?.id,
									)}
									commentLikes={comment.likes as any}
									commentId={comment.id}
									replies={comment.replies as any}
									edited={comment.edited}
									authorId={comment.authorId}
									isAdmin={isAdmin}
								/>
							),
					)}
				</div>
			)}
		</div>
	);
};

export default PostCommentSection;
