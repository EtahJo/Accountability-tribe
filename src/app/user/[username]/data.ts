const base_url = process.env.BASE_URL;
export async function getSessionData(username: string) {
  const sessionRes = await fetch(`${base_url}/user/api/sessions/${username}`, {
    next: {
      tags: ['userSessions'],
    },
  });
  if (!sessionRes.ok) {
    throw new Error('Failed to fetch data');
  }

  return sessionRes.json();
}
