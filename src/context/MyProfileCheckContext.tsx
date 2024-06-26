'use client';

import React, { createContext, useContext, useState } from 'react';

interface MyProfileCheckContextProps {
  myProfile: boolean;
  myProfileCheck: (currentUsername: string, pageUsername: string) => void;
}

const MyProfileCheckContext = createContext<MyProfileCheckContextProps>({
  myProfile: false,
  myProfileCheck(currentUsername, pageUsername) {},
});

const MyProfileCheckContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [myProfile, setMyProfile] = useState(false);
  const myProfileCheck = (currentUsername: string, pageUsername: string) => {
    setMyProfile(currentUsername === pageUsername);
  };
  return (
    <MyProfileCheckContext.Provider value={{ myProfile, myProfileCheck }}>
      {children}
    </MyProfileCheckContext.Provider>
  );
};

export default MyProfileCheckContextProvider;
export const useMyProfileCheck = () => useContext(MyProfileCheckContext);
