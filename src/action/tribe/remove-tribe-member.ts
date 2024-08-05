"use server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";
import {
	getTribeById,
	getSpecificTribeAdmin,
	getTribeUserByTribeUserId,
} from "@/data/tribe";

export const remove_tribe_user = async (tribeId: string, userId: string) => {
	const user = await currentUser();
	const dbUser = await getUserById(user?.id as string);
	if (!user || !dbUser) {
		return { error: "Unauthorised access" };
	}
	const userToDelete = await getUserById(userId);
	if (!userToDelete) {
		return { error: "Not a member of tribe" };
	}
	const tribe = await getTribeById(tribeId, dbUser.id);
	if (!tribe) {
		return { error: "Tribe does not exist" };
	}
	const tribeUser = await getTribeUserByTribeUserId(tribeId, userToDelete.id);
	if (!tribeUser) {
		return { error: "Not a member of tribe" };
	}
	const tribeAdmin = await getSpecificTribeAdmin(tribeId, dbUser.id);
	if (
		tribe.adminsUserIds.includes(userToDelete.id as string) &&
		tribe.adminsUserIds.length === 1 &&
		tribe.users.length > 1
	) {
		// if the admin want to leave and there is no other admin
		return { error: "Make another admin before you leave" };
	}

	if (userToDelete.id !== dbUser.id && !tribeAdmin) {
		// checking if the user logged in is either an admin or the person who wants to leave
		return { error: "You are not authorised " };
	}

	await db.tribeUser.delete({
		where: { id: tribeUser.id },
	});
	await db.notification.create({
		data: {
			userId: tribeUser.userId,
			type: "WARNING",
			message: `You have been removed from the ${tribe.name} tribe`,
		},
	});
	const successMessage =
		userToDelete.id !== dbUser.id && tribeAdmin
			? "Tribe member deleted"
			: "You left tribe";
	return {
		success: successMessage,
		creatorUsername: dbUser.username,
		tribeId,
	};
};
