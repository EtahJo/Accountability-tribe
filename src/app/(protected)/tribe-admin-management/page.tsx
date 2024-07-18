import { currentUser } from '@/lib/authentication';
import SectionHeader from '@/components/SectionHeader';
import Tribes from './_components/Tribes';
import { Button } from '@/components/ui/button';

const base_url = process.env.BASE_URL;

export async function getTribesUserISAdmin(username: string) {
  const tribes = await fetch(
    `${base_url}/user/api/tribes/${username}/user-is-tribe-admin`,
    {
      next: {
        tags: ['userIsTribeAdmin'],
      },
    }
  );
  if (!tribes.ok) {
    throw new Error('Failed to fetch data');
  }
  return tribes.json();
}

const TribeAdminManagementPage = async () => {
  const user = await currentUser();
  const tribesData = await getTribesUserISAdmin(user?.username as string);
  if (tribesData.length === 0) {
    return (
      <div>
        <p>You are not admin of any tribe</p>
        <Button>Create Tribe</Button>
      </div>
    );
  }
  return (
    <div className="h-screen">
      <div className=" flex flex-col justify-center items-center ">
        <SectionHeader name="You are admin of the following tribes" />
        <h2 className="text-2xl bg-white p-2 rounded-3xl my-3">
          Select tribe to manage
        </h2>
        <Tribes tribesData={tribesData} userId={user?.id as string} />
      </div>
    </div>
  );
};

export default TribeAdminManagementPage;
