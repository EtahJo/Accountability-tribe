"use server";
import * as z from "zod";
import { EditTribeSchema } from "@/schemas/index";
import { db } from "@/lib/db";
import { getTribeById, getSpecificTribeAdmin } from "@/data/tribe";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/authentication";

export const edit_tribe = async (
	values: z.infer<typeof EditTribeSchema>,
	tribeId: string,
) => {
	const validatedFields = EditTribeSchema.safeParse(values);
	if (!validatedFields.success) {
		return { error: "Invalid field" };
	}
	const { name, description, profileImage, tags } = validatedFields.data;
	const user = await currentUser();
	const dbUser = await getUserById(user?.id as string);
	if (!user || !dbUser) {
		return { error: "Unauthorised access" };
	}

	const tribe = await getTribeById(tribeId, dbUser.id as string);
	if (!tribe) {
		return { error: "Tribe does not exist" };
	}
	const tribeAdmin = await getSpecificTribeAdmin(tribe.id, dbUser.id);
	if (!tribeAdmin) {
		return { error: "Only admin authorised to make changes" };
	}
	await db.tribe.update({
		where: {
			id: tribeId,
		},
		data: {
			...values,
		},
	});
	return { success: "Change saved", tribeId, creatorUsername: dbUser.username };
};
