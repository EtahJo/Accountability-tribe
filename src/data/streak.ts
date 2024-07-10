import { db } from '@/lib/db';

export const getStreakByUserId = async (userId: string) => {
  try {
    const streak = await db.streak.findUnique({
      where: { userId },
    });
    return streak;
  } catch (error) {
    return error;
  }
};
