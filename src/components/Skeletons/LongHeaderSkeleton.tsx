'use client';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LongHeaderSkeleton = ({
  classNames,
  children,
}: {
  classNames: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn('w-3/4 rounded-3xl p-10 h-64', classNames)}>
      {/* <Skeleton className=" w-full rounded-3xl" /> */}
      {children}
    </div>
  );
};

export default LongHeaderSkeleton;
