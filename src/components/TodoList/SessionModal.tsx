import ModalWrapper from '../ModalWrap/index';
import UpcomingSession from '@/components/UpcomingSession';
import {
  formatDateTime,
  getTimeDifference,
  isToday,
  checkIsAfter,
} from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Props } from 'react-modal';

interface SessionModalProps {
  sessionParticipants: {}[];
}

const SessionModal = ({
  sessionParticipants,
  isOpen,
  onRequestClose,
}: SessionModalProps & Props) => {
  const { user }: any = useCurrentUser();
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white w-1/2 "
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Task Sessions</h1>
        {sessionParticipants?.map(({ sessionParticipant }: any) => (
          <UpcomingSession
            key={sessionParticipant.id}
            startDate={
              formatDateTime(
                sessionParticipant.session.startDateTime,
                user?.timezone
              ).date
            }
            startTime={
              formatDateTime(
                sessionParticipant.session.startDateTime,
                user?.timezone
              ).time
            }
            endDate={
              formatDateTime(
                sessionParticipant.session.endDateTime,
                user?.timezone
              ).date
            }
            endTime={
              formatDateTime(
                sessionParticipant.session.endDateTime,
                user?.timezone
              ).time
            }
            goal={sessionParticipant.goal || sessionParticipant.session.goal}
            duration={JSON.parse(sessionParticipant.session.duration)}
            timeLeft={parseFloat(
              getTimeDifference(sessionParticipant.session.startDateTime)
                .minutes
            )}
            isTodayCheck={isToday(sessionParticipant.session.startDateTime)}
            isAfter={checkIsAfter(sessionParticipant.session.endDateTime)}
            meetingLink={sessionParticipant.session.meetingLink}
            sessionId={sessionParticipant.session.id}
            isMember={true}
            isAdmin={user.username === sessionParticipant.adminUserName}
            members={sessionParticipant.session.participants}
            admin={sessionParticipant.adminUserName}
            endDateTime={sessionParticipant.session.endDateTime}
            userId={sessionParticipant.userId}
          />
        ))}
      </div>
    </ModalWrapper>
  );
};

export default SessionModal;
