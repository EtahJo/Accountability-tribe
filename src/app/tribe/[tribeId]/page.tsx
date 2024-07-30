import TribeDetailHeader from '@/components/Tribe/TribeDetailHeader/index';
import TribeDetailBody from '@/components/Tribe/TribeDetailBody/index';

async function TribeProfile({ params }: { params: { tribeId: string } }) {
  const { tribeId } = params;
  return (
    <div className="flex flex-col gap-y-10 min-[839px]:mt-0 min-[640px]:mt-16 mt-24">
      <TribeDetailHeader tribeId={tribeId} />
      <TribeDetailBody tribeId={tribeId} />
    </div>
  );
}

export default TribeProfile;
