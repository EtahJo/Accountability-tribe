'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EditTask = ({ taskId }: { taskId: string }) => {
  return (
    <Link href={`/edit-task/${taskId}`} className="flex justify-center mt-2">
      <Button size={'slg'} className="py-2">
        Edit
      </Button>
    </Link>
  );
};

export default EditTask;
