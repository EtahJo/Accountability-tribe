import SectionHeader from '@/components/SectionHeader';
import { getSessionById } from '@/data/session';
import EditSessionForm from '@/components/Forms/EditSessionForm';

const EditSession = async ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;
  const session = await getSessionById(sessionId);

  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Edit Session" />
        </div>
        <EditSessionForm session={session} />
      </div>
    </div>
  );
};

export default EditSession;
