import Tribes from '../_components/Tribes';
import FullBodyContent from './_components/FullBodyContent';

const TribeManageMentPage = async ({
  params,
}: {
  params: { tribeId: string };
}) => {
  const { tribeId } = params;

  return (
    <div className="flex flex-col gap-y-10 justify-around items-center ">
      <div className="grid grid-cols-12 items-start md:gap-y-0 gap-y-4">
        <div className="min-[923px]:col-start-2 min-[923px]:col-span-6 col-span-10  col-start-2  ">
          <FullBodyContent tribeId={tribeId} />
        </div>
        <div className="min-[923px]:col-start-9 flex flex-col justify-center items-center col-start-2 min-[923px]:col-span-2 col-span-10 ">
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
