import SectionHeader from '@/components/SectionHeader';
import Tribes from './_components/Tribes';

const TribeAdminManagementPage = async () => {
  return (
    <div className="h-max min-[640px]:mt-0 mt-16">
      <div className=" flex flex-col justify-center items-center ">
        <SectionHeader name="You are admin of the following tribes" />
        <h2 className="text-2xl bg-white p-2 rounded-3xl my-3">
          Select tribe to manage
        </h2>
        <Tribes />
      </div>
    </div>
  );
};

export default TribeAdminManagementPage;
