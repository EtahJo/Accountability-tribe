'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AchievementSkeleton = () => {
  return (
    <Card className="my-3">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-full h-5" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="w-full h-4" />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AchievementSkeleton;
