"use server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getPostById } from "@/data/post";
import { currentUser } from "@/lib/authentication";

import { getUserPostLike, getUserCommentLike } from "@/data/like";
import { getCommentById } from "@/data/comment";

export const delete_post_like = async (postId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorised" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}
	const post = await getPostById(postId);
	if (!post) {
		return { error: "Post does not exist" };
	}
	const like = await getUserPostLike(postId, dbUser.id);
	if (!like) {
		return { error: "User has not liked post" };
	}
	await db.like.delete({
		where: {
			id: like.id,
		},
	});
	return {
		success: "Like deleted",
		postAuthorUsername: post?.author.username,
		postTribeId: post?.tribeId,
	};
};

export const delete_comment_like = async (commentId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorised" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}
	const comment = await getCommentById(commentId);
	if (!comment) {
		return { error: "Comment does not exist" };
	}
	const like = await getUserCommentLike(commentId, dbUser.id);
	if (!like) {
		return { error: "User has not liked post" };
	}
	await db.like.delete({
		where: {
			id: like.id,
		},
	});
	const post = await getPostById(comment.postId);
	return {
		success: "Like deleted",
		postAuthorUsername: post?.author.username,
		postTribeId: post?.tribeId,
	};
};
