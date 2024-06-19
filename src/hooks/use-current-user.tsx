'use client';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  const phoneNumber = user?.number.toString();

  if (user) {
    const countryCode = phoneNumber.split(',');
    return {
      session,
      user: session.data?.user,
      phoneNumber,
      countryCode: countryCode[0].toUpperCase(),
    };
  }

  return {
    session,
    user: session.data?.user,
    phoneNumber,
  };
};
