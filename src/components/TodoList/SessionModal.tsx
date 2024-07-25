'use client';
import { useTransition } from 'react';
import ModalWrapper from '../ModalWrap/index';
import UpcomingSession from '@/components/UpcomingSession/index';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Props } from 'react-modal';
import { remove_task_from_session } from '@/action/task/remove-task-from-session';
import ToolTip from '@/components/ToolTip/index';
import { toast } from 'sonner';

interface SessionModalProps {
  sessionParticipants: {}[];
  taskId: string;
  pageUsername: string;
}

const SessionModal = ({
  sessionParticipants,
  isOpen,
  onRequestClose,
  taskId,
  pageUsername,
}: SessionModalProps & Props) => {
  const [isPending, startTransition] = useTransition();
  const { user }: any = useCurrentUser();
  const removeTaskFromSession = (sessionParticipantId: string) => {
    startTransition(() => {
      remove_task_from_session(taskId, sessionParticipantId).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
      });
    });
  };
  return (
    <ModalWrapper
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white w-1/2 "
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Task Sessions</h1>
        {sessionParticipants?.map(({ sessionParticipant }: any) => (
          <div className="flex items-center gap-1" key={sessionParticipant.id}>
            <UpcomingSession
              startDateTime={sessionParticipant.session.startDateTime}
              goal={sessionParticipant.goal || sessionParticipant.session.goal}
              duration={JSON.parse(sessionParticipant.session.duration)}
              pageUsername={pageUsername}
              meetingLink={sessionParticipant.session.meetingLink}
              sessionId={sessionParticipant.session.id}
              isMember={true}
              isAdmin={user?.username === sessionParticipant.adminUsername}
              members={sessionParticipant.session.participants}
              admin={sessionParticipant.adminUsername}
              endDateTime={sessionParticipant.session.endDateTime}
              userId={sessionParticipant.userId}
              sessionParticipantId={sessionParticipant.id}
              pageUser={user}
            />
            <ToolTip
              trigger={
                <p
                  onClick={() => {
                    removeTaskFromSession(sessionParticipant.id);
                  }}
                  className="font-bold hover:text-purple cursor-pointer"
                >
                  X
                </p>
              }
            >
              <p>Remove task from session</p>
            </ToolTip>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default SessionModal;
