import SectionHeader from '@/components/SectionHeader';
import Tribes from './_components/Tribes';

const base_url = process.env.BASE_URL;

const TribeAdminManagementPage = async () => {
  return (
    <div className="h-screen">
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
