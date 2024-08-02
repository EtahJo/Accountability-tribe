"use server";
import { getAllUsersInSession } from "@/data/session";

export const get_session_participants = async (sessionId: string) => {
	const sessionParticipants = await getAllUsersInSession(sessionId);

	const countries = new Set();
	sessionParticipants?.forEach((participant: any) => {
		countries.add(participant.country);
	});
	return {
		participants: sessionParticipants,
		number_of_countries: countries.size,
	};
};
