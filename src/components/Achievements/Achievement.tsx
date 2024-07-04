'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';

interface AchievementProps {
  dateCompleted: string | Date;
  taskTitle: string;
}

const Achievement = ({ dateCompleted, taskTitle }: AchievementProps) => {
  const day = format(dateCompleted, 'do');
  return (
    <Card className="my-3">
      <CardHeader>
        <CardTitle>Completed {taskTitle}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          On The
          <p className="text-lightPink">
            {day} of {format(dateCompleted, ' MMMM-yyyy')}
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Achievement;
