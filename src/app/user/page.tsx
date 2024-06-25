'use client';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import React from 'react';
import UserProfileBody from '@/components/UserProfileBody';
import { useCurrentUser } from '@/hooks/use-current-user';

const UserProfile = () => {
  const { user, phoneNumber, countryCode } = useCurrentUser();
  return (
    <div>
      <ProfileHeader
        user={user}
        phoneNumber={phoneNumber}
        countryCode={countryCode}
      />
      <UserProfileBody user={user} sessions={user?.sessions} />
    </div>
  );
};

export default UserProfile;
