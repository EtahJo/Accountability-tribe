"use server";
import { db } from "@/lib/db";
import { getSessionUserBySessionUserId, getSessionAdmin } from "@/data/session";
import { getUserById } from "@/data/user";

export const join_session = async (
	values: any,
	sessionId: string,
	userId: string,
) => {
	const dbUser = await getUserById(userId as string);
	if (!dbUser) {
		return { error: "Unauthorised User" };
	}
	const sessionUser = await getSessionUserBySessionUserId(sessionId, userId);
	if (sessionUser) {
		return { error: "Already a Participant" };
	}

	const sessionAdmin = await getSessionAdmin(sessionId);
	const sessionParticipant = await db.sessionParticipant.create({
		data: {
			user: { connect: { id: dbUser.id } },
			session: { connect: { id: sessionId } },
			userRole: "USER",
			goal: values.goal,
			adminUserId: sessionAdmin?.id,
		},
	});
	if (values.taskIds) {
		await db.$transaction(
			values.taskIds.map((taskId: any) =>
				db.sessionTask.create({
					data: {
						taskId: taskId.value,
						sessionParticipantId: sessionParticipant.id,
					},
				}),
			),
		);
	}
	await db.session.update({
		where: { id: sessionId },
		data: {
			participants: {
				increment: 1,
			},
		},
	});
	await db.notification.create({
		data: {
			userId: sessionAdmin?.id as string,
			message: "Someone joined your session",
			type: "SESSIONUPDATES",
		},
	});
	return {
		success: "Session Successfully Added",
		creatorUsername: dbUser.username,
	};
};

export const is_member = async (sessionId: string, userId: string) => {
	const sessionUser = await getSessionUserBySessionUserId(sessionId, userId);
	if (sessionUser) {
		return { isMember: true };
	} else {
		return { isMember: false };
	}
};
