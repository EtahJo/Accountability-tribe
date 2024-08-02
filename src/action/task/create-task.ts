"use server";

import * as z from "zod";
import { CreateTaskArraySchema } from "@/schemas/index";
import { currentUser } from "@/lib/authentication";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const create_task = async (
	values: z.infer<typeof CreateTaskArraySchema>,
	sessionParticipantId?: string,
) => {
	const validatedFields = CreateTaskArraySchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid field" };
	}

	const tasks = validatedFields.data;
	const user = await currentUser();
	if (!user) {
		return { error: "Unauthorised access" };
	}
	const dbUser = await getUserById(user?.id as string);
	if (!dbUser) {
		return { error: "Unauthorised User" };
	}

	/// TODO: add logic for when the is a sessionParticipantId

	await db.$transaction(
		tasks.map(({ title, description, priority, dueDate }) =>
			db.task.create({
				data: {
					title,
					description,
					priority,
					dueDate,
					userId: dbUser.id,
					status: "NOTSTARTED",
				},
			}),
		),
	);
	return {
		success: "Tasks Successfully Created",
		creatorUsername: dbUser.username,
	};
};
