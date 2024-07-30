'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TotalsProps {
  total: number;
  propertyName: string;
  button?: boolean;
  id?: string;
}

const Totals = ({ total, propertyName, button, id }: TotalsProps) => {
  return (
    <div>
      {button ? (
        <Link href={`#${id}`}>
          <Button
            className="flex gap-x-1 move-button md:flex-row flex-col px-2 w-max"
            size={'slg'}
          >
            <p className="  text-purple  text-lg">{total}</p>
            <p className="text-lg overflow-ellipsis">
              {propertyName + (total > 1 ? 's' : '')}
            </p>
          </Button>
        </Link>
      ) : (
        <div
          className="flex  bg-white rounded-3xl p-5 h-max 
    items-center justify-center shadow-3xl gap-2"
        >
          <p
            className="font-bold bg-lighterPink p-2 text-2xl 
      rounded-md"
          >
            {total}
          </p>
          <p className="text-xl opacity-60 font-bold text-purple">
            {propertyName + (total > 1 ? 's' : '')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Totals;
