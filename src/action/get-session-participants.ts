'use server';
import { getSessionById } from '@/data/session';

export const get_session_participants = async (sessionId: string) => {
  const session = await getSessionById(sessionId);
  const participants = session?.participants;
  const countries = new Set();
  participants?.forEach((participant) => {
    countries.add(participant.country);
  });
  return { participants, number_of_countries: countries.size };
};
