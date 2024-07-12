'use client';
import Link from 'next/link';
import ModalWrapper from '@/components/ModalWrap/index';

import { Props } from 'react-modal';
import TribeUser from './TribeUser';
interface TribeUsersProps {
  tribeName: string;
  users: { user: { username: string; image: string }; userRole: string }[];
}
const TribeUsers = ({
  isOpen,
  onRequestClose,
  users,
  tribeName,
}: Props & TribeUsersProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tribe Users"
      className={'  bg-white w-[300px] mt-72 rounded-3xl shadow-3xl'}
    >
      <div className="m-2">
        <h1
          className="text-xl w-full text-center font-bold
         bg-purple p-2 rounded-2xl shadow-3xl mb-3 text-white "
        >
          {tribeName} Members
        </h1>
        {users.map((user, index) => (
          <Link href={`/user/${user.user.username}`} key={index}>
            <TribeUser
              name={user.user.username}
              profileImage={user.user.image}
              isAdmin={user.userRole === 'ADMIN'}
            />
          </Link>
        ))}
      </div>
    </ModalWrapper>
  );
};
export default TribeUsers;
