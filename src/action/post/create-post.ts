"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { CreatePostSchema } from "@/schemas/index";
import { currentUser } from "@/lib/authentication";
import {
	getTribeUserByTribeUserId,
	getSpecificTribeAdmin,
	getAllTribeAdmins,
} from "@/data/tribe";
import { totalTribePostUnApproved } from "@/data/tribe";
import { getUserById } from "@/data/user";

export const create_post = async (
	values: z.infer<typeof CreatePostSchema>,
	tribeId: string,
) => {
	const validatedFields = CreatePostSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid field" };
	}

	const { content, title } = validatedFields.data;
	const user = await currentUser();
	if (!user) {
		return { error: "Sign up or login to post" };
	}
	const dbUser = await getUserById(user?.id as string);
	if (!dbUser) {
		return { error: "Unauthorised User" };
	}
	const tribeUser = await getTribeUserByTribeUserId(tribeId, dbUser.id);
	if (!tribeUser) {
		return { error: "Only tribe members can add post to tribe" };
	}
	const tribeAdmin = await getSpecificTribeAdmin(tribeId, dbUser.id);
	const approved = tribeAdmin ? true : false;

	await db.post.create({
		data: {
			content,
			title,
			tribeId,
			authorId: dbUser.id,
			approved,
		},
	});
	const unApprovedTotal = await totalTribePostUnApproved(tribeId);
	const allTribeAdmins = await getAllTribeAdmins(tribeId);
	if (allTribeAdmins && !tribeAdmin) {
		await db.$transaction(
			allTribeAdmins?.map((admin) =>
				db.notification.create({
					data: {
						userId: admin.userId,
						message: `${unApprovedTotal} ${
							(unApprovedTotal as number) > 1 ? "posts" : "post"
						} pending review`,
						type: "ADMINTASK",
						pageId: tribeId,
					},
				}),
			),
		);
	}

	const returnMessage = tribeAdmin
		? "Post Successfully Created"
		: "Post Created and Pending Approval";

	return {
		success: returnMessage,
		approved,
		postAuthorUsername: dbUser.username,
	};
};
