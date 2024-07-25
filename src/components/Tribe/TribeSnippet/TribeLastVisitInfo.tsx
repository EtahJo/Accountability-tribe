'use client';
import { formatDateTime } from '@/util/DateTime';
import { useCurrentUser } from '@/hooks/use-current-user';

const TribeLastVisitInfo = ({ lastVisit }: { lastVisit?: string }) => {
  const { user }: any = useCurrentUser();
  return (
    <div className="flex justify-end   w-full absolute right-1 top-1">
      <div className="text-gray-500 text-[10px] bg-lighterPink rounded-3xl px-2  flex flex-col items-center justify-center">
        {lastVisit ? (
          <>
            {' '}
            <p className="font-bold text-black">Last Visit</p>
            <p>{formatDateTime(lastVisit, user?.timezone).date}</p>
            <p>{formatDateTime(lastVisit, user?.timezone).time}</p>
          </>
        ) : (
          <>
            <p>Never Visited</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TribeLastVisitInfo;
