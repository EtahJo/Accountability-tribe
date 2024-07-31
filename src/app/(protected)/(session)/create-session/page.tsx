import SectionHeader from '@/components/SectionHeader/index';
import CreateSessionForm from '@/components/Forms/CreateSessionForm';

const CreateSession = async () => {
  return (
    <div className="flex flex-col items-center align-middle m-auto">
      <div className="m-auto">
        <div className="min-[640px]:mt-0 mt-16 flex justify-center">
          <SectionHeader name="Create A Session" />
        </div>
        <CreateSessionForm />
      </div>
    </div>
  );
};

export default CreateSession;
