'use client';
import { Skeleton } from '@/components/ui/skeleton';

const UserSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[80px] h-[80px] rounded-full border shadow-3xl" />
    </div>
  );
};

export default UserSkeleton;
