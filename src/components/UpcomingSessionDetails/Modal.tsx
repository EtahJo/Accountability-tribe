'use client';
import ModalWrapper from '../ModalWrap/index';
import { Props } from 'react-modal';
import UpcomingSessionDetail from '@/components/UpcomingSessionDetails';
import { UpcomingSessionProps } from '@/components/UpcomingSession';
interface UpcomingSessionDetailModalProps {
  period: string;
  upcomingSessionChildren?: React.ReactNode;
  tasks?: {}[];
  pageUser?: {};
  sessionParticipantId: string;
}

const UpcomingSessionDetailModal = ({
  isOpen,
  onRequestClose,
  startDate,
  startTime,
  goal,
  duration,
  timeLeft,
  meetingLink,
  isTodayCheck,
  isAfter,
  isAdmin,
  isMember,
  sessionId,
  members,
  userId,
  admin,
  endDate,
  endDateTime,
  endTime,
  period,
  tasks,
  pageUser,
  sessionParticipantId,
}: Props & UpcomingSessionDetailModalProps & UpcomingSessionProps) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Session Details"
      className={' w-max'}
    >
      <UpcomingSessionDetail
        startDate={startDate}
        startTime={startTime}
        goal={goal}
        duration={duration}
        timeLeft={timeLeft}
        isTodayCheck={isTodayCheck}
        isAfter={isAfter}
        meetingLink={meetingLink}
        isAdmin={isAdmin}
        sessionId={sessionId}
        period={period}
        endDate={endDate}
        endTime={endTime}
        isMember={isMember}
        members={members}
        admin={admin}
        userId={userId}
        endDateTime={endDateTime}
        tasks={tasks}
        pageUser={pageUser}
        sessionParticipantId={sessionParticipantId}
        showDeleteOrLeave
      />
    </ModalWrapper>
  );
};

export default UpcomingSessionDetailModal;
