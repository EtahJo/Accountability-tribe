"use server";
import * as z from "zod";
import { EditSessionSchema } from "@/schemas/index";
import { currentUser } from "@/lib/authentication";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import {
	getSessionById,
	getSessionAdmin,
	getSessionUserBySessionUserId,
} from "@/data/session";
import { getTimeDifference, getDuration } from "@/util/DateTime";

export const edit_session = async (
	values: z.infer<typeof EditSessionSchema>,
	sessionId: string,
) => {
	const { goal, startEndDateTime, meetingLink, taskIds } = values;
	// check if user logged in
	const user = await currentUser();
	if (!user) {
		return { error: "Unauthorized User" };
	}
	// check if user exist in database
	const dbUser = await getUserById(user?.id as string);
	if (!dbUser) {
		return { error: "Unathorised User" };
	}
	// get session from database
	const session = await getSessionById(sessionId);

	if (!session) {
		return { error: "Session does not exit" };
	}

	// check if user is the admin
	const checkIfAdmin = await getSessionAdmin(session.id);

	if (checkIfAdmin?.id !== dbUser.id) {
		return { error: "You are not authorised to make edits to Session!" };
	}
	const sessionParticipant = await getSessionUserBySessionUserId(
		session.id,
		dbUser.id,
	);

	// check if session has started or end
	// const isAfter = checkIsAfter(session.endDateTime);

	const timeLeft = parseFloat(
		getTimeDifference(session.startDateTime.toISOString()).minutes,
	);
	if (values.startEndDateTime) {
		if (timeLeft < 5) {
			return {
				error: "Too late to make any changes to session Time",
			};
		}
	}
	const durationObj = getDuration(
		startEndDateTime?.startDateTime.toISOString() as string,
		startEndDateTime?.endDateTime.toISOString() as string,
	).hm;
	const duration = JSON.stringify(durationObj);
	await db.session.update({
		where: { id: session.id },
		data: {
			goal,
			startDateTime: startEndDateTime?.startDateTime,
			endDateTime: startEndDateTime?.endDateTime,
			meetingLink,
			duration,
		},
	});
	if (taskIds) {
		await db.$transaction(
			taskIds.map((taskId) =>
				db.sessionTask.create({
					data: {
						taskId: taskId.value,
						sessionParticipantId: sessionParticipant?.id as string,
					},
				}),
			),
		);
	}

	await db.$transaction(
		session.users.map((user) =>
			db.notification.create({
				data: {
					userId: user.userId,
					message: "Updates made to session",
					type: "SESSIONUPDATES",
				},
			}),
		),
	);

	// TODO: send email to all participants

	return {
		success: "Changes successfully made to Session",
		creatorUsername: dbUser.username,
	};

	// all checks passed then update session
};
