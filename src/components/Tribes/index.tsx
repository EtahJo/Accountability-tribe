'use client';
import SectionHeader from '../SectionHeader/index';
import { FaPlusCircle } from 'react-icons/fa';
import { useMyProfileCheck } from '@/context/MyProfileCheckContext';

interface TribesProps {
  children: React.ReactNode;
}
const Tribes = ({ children }: TribesProps) => {
  const { myProfile } = useMyProfileCheck();
  return (
    <div className="flex flex-col justify-center">
      <SectionHeader
        name="Tribes"
        classNames={myProfile ? 'justify-between' : 'justify-center'}
        buttonTitle="Create Tribe"
        buttonLink="/create-tribe"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />
      <div>{children}</div>
    </div>
  );
};

export default Tribes;
