'use client';
import SectionHeader from '../SectionHeader/index';
import { FaPlusCircle } from 'react-icons/fa';

interface TribesProps {
  children: React.ReactNode;
  pageUsername: string;
}
const Tribes = ({ children, pageUsername }: TribesProps) => {
  return (
    <div className="flex flex-col justify-center">
      <SectionHeader
        name="Tribes"
        classNames=""
        buttonTitle="Create Tribe"
        pageUsername={pageUsername}
        buttonLink="/create-tribe"
        buttonIcon={<FaPlusCircle size={20} className="text-lightPink" />}
      />
      <div>{children}</div>
    </div>
  );
};

export default Tribes;
