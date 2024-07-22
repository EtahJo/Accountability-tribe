import Tribes from '../_components/Tribes';
import FullBodyContent from './_components/FullBodyContent';

const base_url = process.env.BASE_URL;

const TribeManageMentPage = async ({
  params,
}: {
  params: { tribeId: string };
}) => {
  const { tribeId } = params;

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
