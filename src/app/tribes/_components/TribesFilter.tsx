'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TribesFilterProps {
  tags: unknown[];
  page: number;
}

const TribesFilter = ({ tags, page }: TribesFilterProps) => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const [selectedTag, setSelectedTag] = useState(filter);

  const onTagClicked = (tag: any) => {
    setSelectedTag(tag);
  };

  return (
    <div
      className="flex items-center gap-2 my-3 flex-wrap 
    lg:justify-start justify-center"
    >
      {tags?.map((tag, index) => (
        <Link href={`?page=${page}&filter=${tag}`} key={index}>
          <Button
            onClick={() => {
              onTagClicked(tag);
            }}
            className={cn(
              selectedTag === tag ? 'bg-purple' : 'bg-black',
              'transition-all'
            )}
          >
            {tag as string}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default TribesFilter;
