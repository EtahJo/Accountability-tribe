'use client';
import { TribeUser, Tribe, TribeVisit } from '@prisma/client';
import { cn } from '@/lib/utils';
import TribeSnippet from '@/components/Tribe/TribeSnippet/index';

type TribeAdminManagementPageProps = Tribe & {
  tribeVisit: TribeVisit[];
  users: TribeUser[];
};
interface USerIsAdminProps {
  tribesData: TribeAdminManagementPageProps[];
  userId: string;
  asSideBy?: boolean;
}
const Tribes = ({ tribesData, userId, asSideBy }: USerIsAdminProps) => {
  return (
    <div className={cn('flex gap-x-2', asSideBy ? 'flex-col' : 'flex-wrap ')}>
      {tribesData.map(
        ({ id, description, name, profileImage, users, tribeVisit }) => (
          <TribeSnippet
            key={id}
            name={name}
            desc={description}
            tribeId={id}
            userId={userId}
            isMember={users.some(
              (tribeUser: TribeUser) => tribeUser.userId === userId
            )}
            members={users.length}
            image={profileImage}
            lastVisit={tribeVisit[0]?.lastVisit as any}
            manage
          />
        )
      )}
    </div>
  );
};

export default Tribes;
