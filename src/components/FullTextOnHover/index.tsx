import { cn } from '@/lib/utils';

interface FullTextOnHoverProps {
  text: string;
  isAfter?: boolean;
}
const FullTextOnHover = ({ text, isAfter }: FullTextOnHoverProps) => {
  return (
    <div className={cn('group relative', isAfter ? 'w-52' : 'w-28')}>
      <div className="truncate ">{text}</div>
      <p
        className={cn(
          'absolute hidden z-10 bg-[rgba(0,0,0,0.8)] p-px px-2 group-hover:flex group-hover:overflow-vissible group-hover:whitespace-normal shadow rounded-lg text-white'
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default FullTextOnHover;
