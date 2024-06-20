'use client';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import React from 'react';
import UserProfileBody from '@/components/UserProfileBody';

const UserProfile = () => {
  return (
    <div>
      <ProfileHeader />
      <UserProfileBody />
    </div>
  );
};

export default UserProfile;
