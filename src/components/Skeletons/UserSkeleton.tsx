'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const UserSkeleton = ({ classNames }: { classNames: string }) => {
  return (
    <div>
      <Skeleton className={cn('rounded-full border shadow-3xl', classNames)} />
    </div>
  );
};

export default UserSkeleton;
