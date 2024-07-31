'use client';
import useSWR from 'swr';
import SectionHeader from '@/components/SectionHeader/index';
import EditSessionForm from '@/components/Forms/EditSessionForm';
import { useCurrentUser } from '@/hooks/use-current-user';
import FormSkeleton from '@/components/Skeletons/FormSkeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const EditSession = ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;
  const { user }: any = useCurrentUser();
  const { data: session, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/sessions/api/${user.id}/${sessionId}`,
    fetcher
  );
  if (isLoading || session === undefined) {
    return <FormSkeleton />;
  }
  console.log('Session Data >>', session);
  return (
    <div className=" flex flex-col h-max items-center align-middle m-auto">
      <div className="m-auto">
        <div className="min-[640px]:mt-0 mt-16 flex justify-center">
          <SectionHeader name="Edit Session" />
        </div>
        <EditSessionForm
          session={session.session}
          sessionTasks={session?.tasks as {}[]}
          sessionParticipantId={session.id}
        />
      </div>
    </div>
  );
};

export default EditSession;
