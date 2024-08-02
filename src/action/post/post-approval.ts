"use server";

import { db } from "@/lib/db";
import { getPostById, getPostEditById } from "@/data/post";
import { getUserById } from "@/data/user";
import { getSpecificTribeAdmin } from "@/data/tribe";
import { currentUser } from "@/lib/authentication";

export const approve_post = async (postId: string) => {
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
	const isAdminLoggedIn = await getSpecificTribeAdmin(post.tribeId, dbUser.id);
	if (!isAdminLoggedIn) {
		return { error: "You are not authorised to approve post" };
	}
	await db.post.update({
		where: { id: post.id },
		data: {
			approved: true,
		},
	});
	await db.notification.create({
		data: {
			userId: post.authorId,
			message: `Your post, "${post?.title}" has been approved`,
			type: "APPROVAL",
			pageId: post.tribeId,
			locationId: postId,
		},
	});
	return {
		success: "Post approved",
		postTribeId: post?.tribeId,
		postAuthorUsername: post?.author.username,
	};
};

export const post_edit_approval = async (postEditId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorised" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}
	const postEdit = await getPostEditById(postEditId);
	if (!postEdit) {
		return { error: "Post Edit does not exist" };
	}
	const post = await getPostById(postEdit.postId);
	if (!post) {
		return { error: "Post does not exist" };
	}
	const isAdminLoggedIn = await getSpecificTribeAdmin(
		postEdit.post.tribeId,
		dbUser.id,
	);
	if (!isAdminLoggedIn) {
		return { error: "You are not authorised to approve post" };
	}
	await db.postEdit.update({
		where: { id: postEdit.id },
		data: {
			approved: true,
		},
	});
	await db.post.update({
		where: { id: postEdit.post.id },
		data: {
			title: postEdit.title,
			content: postEdit.content,
			edited: true,
		},
	});
	await db.notification.create({
		data: {
			userId: postEdit.post.authorId,
			message: `Your post Edit has been approved`,
			type: "APPROVAL",
			pageId: postEdit.post.tribeId,
			locationId: postEdit.post.id,
		},
	});
	return {
		success: "Edit approved",
		postTribeId: post?.tribeId,
		postAuthorUsername: post.author.username,
	};
};
