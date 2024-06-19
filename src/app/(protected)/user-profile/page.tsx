import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import React from 'react';
import UserProfileBody from '@/components/UserProfileBody';
import SelectPeriod from '@/components/SelectPeriod/index';

const UserProfile = () => {
  return (
    <div>
      <ProfileHeader />
      <SelectPeriod />
      <UserProfileBody />
    </div>
  );
};

export default UserProfile;
