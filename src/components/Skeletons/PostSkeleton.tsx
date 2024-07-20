'use client';
import { Skeleton } from '@/components/ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-5  my-5 relative space-y-4">
      <div className="flex items-center gap-x-2">
        <Skeleton className="w-[80px] h-[80px] rounded-full" />
        <div className="flex flex-col gap-y-3">
          <Skeleton className="h-4 w-11 rounded-2xl" />
          <Skeleton className="h-4 w-11 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="h-11 w-full rounded-2xl" />
      <Skeleton className="h-8 w-8 rounded-2xl" />
      <Skeleton className="rounded-3xl h-7 w-full" />
    </div>
  );
};

export default PostSkeleton;
