import SectionHeader from '@/components/SectionHeader';
import { FaPlusCircle } from 'react-icons/fa';
import SessionsBody from './_components/SessionsBody';

const SessionHomePage = async () => {
  return (
    <div className="px-20">
      <SectionHeader
        name="All Available Sessions"
        buttonLink="/create-session"
        buttonTitle="Create Session"
        buttonIcon={<FaPlusCircle />}
      />
      <SessionsBody />
    </div>
  );
};

export default SessionHomePage;
