'use server';

import { getAllUsersInTribe } from '@/data/tribe';

export const get_tribe_members = async (tribeId: string) => {
  const tribeMembers = await getAllUsersInTribe(tribeId);
  return tribeMembers;
};
