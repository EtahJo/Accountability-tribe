'use client';
import React from 'react';
import { useCurrentUser } from '@/hooks/use-current-user';

const UserHome = () => {
  const { session } = useCurrentUser();

  return <div>UserHome</div>;
};

export default UserHome;
