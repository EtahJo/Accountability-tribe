"use server";

import * as z from "zod";
import { CreateTribeSchema } from "@/schemas/index";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";

export const create_tribe = async (
	values: z.infer<typeof CreateTribeSchema>,
) => {
	const validatedFields = CreateTribeSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid field" };
	}
	const { name, description, profileImage, tags } = validatedFields.data;
	const user = await currentUser();
	if (!user) {
		return { error: "Unauthorised access" };
	}
	const dbUser = await getUserById(user?.id as string);
	if (!dbUser) {
		return { error: "Unauthorised User" };
	}
	const tribe = await db.tribe.create({
		data: {
			name,
			description,
			profileImage,
			tags,
			adminsUsername: [dbUser.username as string],
		},
	});
	await db.tribeUser.create({
		data: {
			user: { connect: { id: dbUser.id } },
			tribe: { connect: { id: tribe.id } },
			userRole: "ADMIN",
			adminsUsername: [dbUser.username as string],
		},
	});
	return {
		success: "Tribe Successfully Created",
		tribeId: tribe.id,
		creatorUsername: dbUser.username,
	};
};
