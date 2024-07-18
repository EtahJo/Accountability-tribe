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
          <Button className="flex gap-x-2 py-6 move-button">
            <p className="bg-white rounded-full p-1 text-black my-2 text-lg">
              {total}
            </p>
            <p>{propertyName + (total > 1 ? 's' : '')}</p>
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
