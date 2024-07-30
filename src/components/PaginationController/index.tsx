'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationControllerProps {
  hasMore: boolean;
  page: number;
  pageNumbers: number[];
  totalPages: number;
  filter?: string | null;
}

const PaginationController = ({
  hasMore,
  page,
  filter,
  pageNumbers,
  totalPages,
}: PaginationControllerProps) => {
  const isPageOutofRange = page > totalPages;
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;

  return (
    <div>
      {isPageOutofRange && totalPages !== 0 ? (
        <div className="m-auto flex justify-center  h-screen">
          <p className="bg-white rounded-xl p-2 h-10">Page out of range...</p>
        </div>
      ) : (
        <div
          className=" flex justify-center gap-4 text-white
      m-auto text-xl font-bold"
        >
          {page === 1 ? (
            <div
              className="opacity-50 bg-purple rounded-2xl shadow-3xl  p-2 move-button"
              aria-disabled={true}
            >
              Previous
            </div>
          ) : (
            <Link
              href={
                !filter || filter === undefined
                  ? `?page=${prevPage}`
                  : `?page=${prevPage}&filter=${filter}`
              }
              className="cursor-pointer
           bg-purple rounded-xl shadow-3xl  p-2 move-button"
              aria-label="Previous page"
            >
              Previous
            </Link>
          )}
          {pageNumbers.map((pageNumber: any, index: any) => (
            <Link
              key={index}
              href={
                !filter || filter === undefined
                  ? `?page=${pageNumber}`
                  : `?page=${pageNumber}&filter=${filter}`
              }
              className={cn(
                'cursor-pointer bg-purple rounded-xl shadow-3xl  p-2 move-button',
                pageNumber === page && 'bg-black'
              )}
              aria-label="Previous page"
            >
              {pageNumber}
            </Link>
          ))}

          {hasMore ? (
            <Link
              href={
                !filter || filter === undefined
                  ? `?page=${nextPage}`
                  : `?page=${nextPage}&filter=${filter}`
              }
              className={cn(
                'cursor-pointer move-button bg-purple rounded-xl shadow-3xl  p-2'
              )}
              aria-label="Next page"
            >
              Next
            </Link>
          ) : (
            <div
              className="opacity-50 bg-purple rounded-xl shadow-3xl  p-2 move-button"
              aria-disabled={true}
            >
              Next
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaginationController;
