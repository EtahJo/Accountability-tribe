"use server";

import { google } from "googleapis";
import * as z from "zod";
import { CreateSessionSchema } from "@/schemas";

const oauth2Client = new google.auth.OAuth2(
	process.env.AUTH_GOOGLE_ID,
	process.env.AUTH_GOOGLE_SECRET,
	process.env.AUTH_REDIRECT_URI,
);

export const create_google_meeting_link = async (
	token: any,
	eventDetails: z.infer<typeof CreateSessionSchema>,
) => {
	const validatedFields = CreateSessionSchema.safeParse(eventDetails);
	if (!validatedFields.success) {
		return { error: "Invalid Fields" };
	}
	const { goal, startEndDateTime, meetingLink, taskIds } = validatedFields.data;
	oauth2Client.setCredentials({
		access_token: token.accessToken,
		refresh_token: token.refreshToken,
	});
	const calendar = google.calendar({ version: "v3", auth: oauth2Client });

	const event = {
		summary: goal,

		start: {
			dateTime: startEndDateTime.startDateTime.toISOString(),
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		end: {
			dateTime: startEndDateTime.endDateTime.toISOString(),
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
		conferenceData: {
			createRequest: {
				requestId: "some-random-id",
				conferenceSolutionKey: {
					type: "hangoutsMeet",
				},
			},
		},
	};

	const response = await calendar.events.insert({
		calendarId: "primary",
		requestBody: event,
		conferenceDataVersion: 1,
	});
	return response.data.hangoutLink;
};
