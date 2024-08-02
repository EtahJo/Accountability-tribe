"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/authentication";
import { getUserById } from "@/data/user";
import { getNotificationById } from "@/data/notification";

export const update_notification = async (notificationId: string) => {
	const user = await currentUser();
	if (!user) {
		return { error: "Not Authorsed" };
	}
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) {
		return { error: "Not Authorised" };
	}
	const notification = await getNotificationById(notificationId);
	if (!notification) {
		return { error: "Notification does not exist" };
	}
	if (notification.userId !== dbUser.id) {
		return { error: "Not Authorised" };
	}
	await db.notification.update({
		where: { id: notification.id },
		data: {
			read: true,
		},
	});
};
