import GetAllSessions from '@/components/GetAllSessions/index';

const UserSessions = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return <GetAllSessions username={username} />;
};

export default UserSessions;
