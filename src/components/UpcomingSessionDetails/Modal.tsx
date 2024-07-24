'use client';
import ModalWrapper from '../ModalWrap/index';
import { Props } from 'react-modal';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails/index';
import { UpcomingSessionProps } from '@/components/UpcomingSession/index';
interface UpcomingSessionDetailModalProps {
  upcomingSessionChildren?: React.ReactNode;
  tasks?: {}[];
  pageUser?: {};
  pageUsername?: string;
  sessionParticipantId: string;
  startDateTime: string;
}

const UpcomingSessionDetailModal = ({
  isOpen,
  onRequestClose,
  goal,
  duration,
  meetingLink,
  isAdmin,
  isMember,
  sessionId,
  members,
  userId,
  admin,
  endDateTime,
  tasks,
  pageUser,
  pageUsername,
  sessionParticipantId,
  startDateTime,
}: Props & UpcomingSessionDetailModalProps & UpcomingSessionProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Session Details"
      className={' w-max'}
    >
      <UpcomingSessionDetail
        goal={goal}
        duration={duration}
        meetingLink={meetingLink}
        isAdmin={isAdmin}
        sessionId={sessionId}
        isMember={isMember}
        members={members}
        admin={admin}
        userId={userId}
        endDateTime={endDateTime}
        tasks={tasks}
        pageUser={pageUser}
        sessionParticipantId={sessionParticipantId}
        showDeleteOrLeave
        startDateTime={startDateTime}
        pageUsername={pageUsername}
      />
    </ModalWrapper>
  );
};

export default UpcomingSessionDetailModal;
