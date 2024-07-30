import { cn } from '@/lib/utils';

interface FullTextOnHoverProps {
  text: string;
  isAfter?: boolean;
  className?: string;
  textClassName?: string;
}
const FullTextOnHover = ({
  text,
  isAfter,
  className,
  textClassName,
}: FullTextOnHoverProps) => {
  return (
    <div className={cn('group relative w-28', className)}>
      <div className="truncate ">{text}</div>
      <p
        className={cn(
          'absolute hidden z-10 bg-[rgba(0,0,0,0.8)] p-px px-2 group-hover:flex group-hover:overflow-vissible group-hover:whitespace-normal shadow rounded-lg text-white',
          textClassName
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default FullTextOnHover;
