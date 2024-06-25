'use client';
import SectionHeader from '../SectionHeader/index';
import { FaPlusCircle } from 'react-icons/fa';
import TribeSnippet from '@/components/Tribe/TribeSnippet';
import { useCurrentUser } from '@/hooks/use-current-user';
import { join_tribe } from '@/action/join-tribe';

interface TribesProps {
  tribes: [] | undefined;
}
const Tribes = ({ tribes }: TribesProps) => {
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col justify-center">
      <SectionHeader
        name="Tribes"
        buttonTitle="Create Tribe"
        buttonLink="/create-tribe"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />
      <div>
        {tribes?.map(({ tribe }) => {
          return (
            <div key={tribe.id}>
              <TribeSnippet
                name={tribe?.name}
                desc={tribe?.description}
                tribeId={tribe?.id}
                userId={user?.id as string}
                joinTribe={() => {
                  join_tribe(tribe?.id, user?.id as string);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tribes;
