'use client';
import { useState } from 'react';
import { FaCheck, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface TodoProps {
  taskTitle: string;
  priority: number;
  description: string;
  status: string;
}
const Todo = ({ taskTitle, priority, description, status }: TodoProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-4 my-2 w-[320px] shadow-3xl transition-all mx-2 h-[100px] duration-700',
        showDetail && 'h-auto'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-transparent border-lightPink border-2 rounded-full flex items-center justify-center ">
            <FaCheck className="text-purple m-auto" />
          </div>
          <div>
            <p className="font-bold text-lg">{taskTitle}</p>
            <div className="flex items-center gap-2 ">
              <p
                className={cn(
                  'text-white bg-purple rounded-xl px-2 py-px text-xs whitespace-nowrap',
                  priority === 2 && 'bg-green-600',
                  priority === 3 && 'bg-gray-500',
                  priority === 1 && 'bg-purple'
                )}
              >
                {priority === 1 && 'FIRST PRIORITY'}
                {priority === 2 && 'HIGH PRIORITY'}
                {priority === 3 && 'LOW PRIORITY'}
              </p>
              <p className="rounded-xl border-lightPink border-2 px-2 py-px text-xs">
                {status === 'NOTSTARTED' ? 'NOT STARTED' : status}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            onClick={() => {
              setShowDetail((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            {showDetail ? (
              <FaCaretUp size={30} />
            ) : (
              <FaCaretDown className="" size={30} />
            )}
          </div>
        </div>
      </div>
      {showDetail && (
        <div
          className={cn(
            'bg-lighterPink mt-3 rounded-2xl p-2 transition-all duration-1000'
          )}
        >
          <p>{description}</p>
          <span>
            <p>Due Date: </p>
            <p className="text-purple font-bold">04/06/2024</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Todo;
