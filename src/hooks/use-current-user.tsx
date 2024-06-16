import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  return { session, user: session.data?.user };
};
