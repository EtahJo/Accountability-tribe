import { db } from "@/lib/db";

export const getNotificationById = async (notificationId: string) => {
	try {
		const notification = await db.notification.findUnique({
			where: { id: notificationId },
			include: {
				user: true,
			},
		});
		return notification;
	} catch (error: any) {
		console.error("Get notification by Id error", error.message);
	}
};
