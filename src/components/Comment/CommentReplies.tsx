'use client';
import { Button } from '@/components/ui/button';
import { FaComment } from 'react-icons/fa';

interface CommentRepliesProps {
  replies: {}[];
  setResponding: (val: any) => void;
  setShowReplies: (val: any) => void;
}

const CommentReplies = ({
  replies,
  setResponding,
  setShowReplies,
}: CommentRepliesProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Button
          size={'icon'}
          className="peer relative"
          onClick={() => setResponding((prev: boolean) => !prev)}
        >
          <FaComment className="text-lightPink" size={15} />
        </Button>
        <p
          className="bg-lighterPink px-2 py-px rounded-2xl mt-2 absolute top-5
       left-3 hidden peer peer-hover:block text-black"
        >
          Reply
        </p>
      </div>
      {replies?.length > 0 && (
        <p
          className="text-lightPink cursor-pointer whitespace-nowrap largePhone:text-base  text-xs"
          onClick={() => setShowReplies((prev: boolean) => !prev)}
        >
          {' '}
          {replies?.length} {replies?.length > 1 ? 'replies' : 'reply'}
        </p>
      )}
    </div>
  );
};

export default CommentReplies;
