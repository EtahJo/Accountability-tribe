"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";
import { getSpecificTribeAdmin, getTribeById } from "@/data/tribe";

export const remove_as_admin = async (tribeId: string, userId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorised" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}
	const userToRemove = await getUserById(userId);
	const isAdminLoggedIn = await getSpecificTribeAdmin(tribeId, dbUser.id);
	if (!isAdminLoggedIn) {
		return { error: "Only admins can remove user as admin" };
	}
	const isUserAdmin = await getSpecificTribeAdmin(tribeId, userId);
	if (!isUserAdmin) {
		return { error: "User is not admin" };
	}
	const tribe = await getTribeById(tribeId, dbUser.id);
	if (tribe?.adminsUserIds.length === 1) {
		return { error: "You can not remove the only admin" };
	}

	await db.tribeUser.update({
		where: {
			userId_tribeId: { tribeId, userId },
		},
		data: {
			userRole: "USER",
		},
	});
	const updatedAdmins = tribe?.adminsUserIds.filter(
		(adminUserId) => adminUserId !== userToRemove?.id,
	);

	await db.tribe.update({
		where: { id: tribe?.id },
		data: {
			adminsUserIds: updatedAdmins,
		},
	});

	await db.tribeUser.updateMany({
		where: { tribeId },
		data: {
			adminsUserIds: updatedAdmins,
		},
	});
	await db.notification.create({
		data: {
			userId,
			message: `You have been removed as admin of the ${tribe?.name} tribe`,
			type: "APPROVAL",
			pageId: tribe?.id,
		},
	});
	return { success: "User removed as admin", tribeId };
};
