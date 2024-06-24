'use client';
import { useEffect, useState, useTransition } from 'react';
import { get_user_by_username } from '@/action/get-user';
import ProfileHeader from '@/components/UserProfile/ProfileHeader/index';
import UserProfileBody from '@/components/UserProfileBody/index';
const page = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const [isPending, startTransition] = useTransition();
  const [userInfo, setUserInfo] = useState({});
  const [countryCode, setCountryCode] = useState('');
  useEffect(() => {
    startTransition(() => {
      get_user_by_username(username).then((data) => {
        if (data.success) {
          setUserInfo(data.user);
          const phoneNumber = data.user.number.toString();
          const countryCode = phoneNumber.split(',');
          setCountryCode(countryCode[0].toUpperCase());
        }
        if (data.error) {
          console.log(data.error);
        }
      });
    });
  }, []);
  return (
    <div>
      {isPending ? (
        <div>Loading</div>
      ) : (
        <div>
          <ProfileHeader
            user={userInfo}
            phoneNumber={userInfo.number}
            countryCode={countryCode}
          />
          <UserProfileBody />
        </div>
      )}
    </div>
  );
};

export default page;
