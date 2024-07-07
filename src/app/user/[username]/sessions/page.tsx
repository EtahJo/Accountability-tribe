import { currentUser } from '@/lib/authentication';

import GetAllSessions from '@/components/GetAllSessions';

async function getSessionData(
  username: string,
  currentUserId: string,
  page: number,
  filter: string
) {
  const sessionRes = await fetch(
    `http://localhost:3000/user/api/sessions/${username}/${currentUserId}?page=${page}&filter=${filter}`,
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

const UserSessions = async ({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: any;
}) => {
  const { username } = params;
  const current_user: any = await currentUser();
  let page = parseInt(searchParams.page, 10);

  const filter = searchParams.filter;
  page = !page || page < 1 ? 1 : page;
  const sessions = await getSessionData(
    username,
    current_user?.id as string,
    page,
    filter
  );

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const totalPages = sessions.totalPages;
  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <GetAllSessions
      username={username}
      filter={filter}
      prevPage={prevPage}
      sessions={sessions}
      totalPages={totalPages}
      current_user={current_user}
      page={page}
      nextPage={nextPage}
      pageNumbers={pageNumbers}
    />
  );
};

export default UserSessions;
