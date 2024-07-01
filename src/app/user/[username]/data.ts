export async function getSessionData(username: string) {
  const sessionRes = await fetch(
    `http://localhost:3000/user/api/sessions/${username}`,
    {
      next: {
        tags: ['userSessions'],
      },
    }
  );
  if (!sessionRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return sessionRes.json();
}
