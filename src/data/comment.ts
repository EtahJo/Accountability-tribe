import { db } from "@/lib/db";

export const getCommentById = async (commentId: string) => {
	try {
		const comment = await db.comment.findUnique({
			where: { id: commentId },
			include: {
				post: { include: { tribe: true } },
			},
		});
		return comment;
	} catch (error: any) {
		console.error("Error while fetching comment by id", error.message);
	}
};
export const getCommentReplies = async (commentId: string) => {
	try {
		const commentReplies = await db.comment.findMany({
			where: { parentId: commentId },
			include: {
				replies: {
					include: {
						author: true,
						likes: { include: { user: true } },
						replies: {
							include: { author: true, likes: { include: { user: true } } },
						},
					},
				},
			},
		});
		return commentReplies;
	} catch (error: any) {
		console.error("Error while fetching all comment replies", error.message);
	}
};
