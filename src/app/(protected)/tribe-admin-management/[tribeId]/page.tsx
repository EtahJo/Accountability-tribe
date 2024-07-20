import { currentUser } from '@/lib/authentication';
import Tribes from '../_components/Tribes';
import FullBodyContent from './_components/FullBodyContent';

const base_url = process.env.BASE_URL;
async function getTribesDetails(username: string, tribeId: string) {
  const tribes = await fetch(
    `${base_url}/user/api/tribes/${username}/user-is-tribe-admin/${tribeId}`,
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

const TribeManageMentPage = async ({
  params,
}: {
  params: { tribeId: string };
}) => {
  const { tribeId } = params;
  const user = await currentUser();
  const tribeDetails = await getTribesDetails(
    user?.username as string,
    tribeId
  );

  if (!tribeDetails.tribeInfo.adminsUsername?.includes(user?.username)) {
    return (
      <div>
        <p>Not Authorised </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 justify-around items-center pb-32">
      <div className="grid grid-cols-12 items-start">
        <div className="col-start-3 col-span-6 ">
          <FullBodyContent tribeId={tribeId} />
        </div>
        <div className="col-start-10">
          <h2 className="font-bold text-xl whitespace-nowrap">
            Other Tribes You Manage
          </h2>
          <Tribes asSideBy presentTribeId={tribeId} />
        </div>
      </div>
    </div>
  );
};

export default TribeManageMentPage;
