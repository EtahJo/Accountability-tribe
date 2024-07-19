import SectionHeader from '@/components/SectionHeader/index';
import CreateSessionForm from '@/components/Forms/CreateSessionForm';

const CreateSession = async () => {
  return (
    <div className=" flex flex-col h-screen items-center align-middle m-auto">
      <div className="m-auto">
        <div className="-mt-14 flex justify-center">
          <SectionHeader name="Create A Session" />
        </div>

        <CreateSessionForm />
      </div>
    </div>
  );
};

export default CreateSession;
