'use client';
import { SectionHeaderType } from '@/types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';

const SectionHeader = ({
  name,
  icon,
  buttonLink,
  buttonTitle,
  buttonIcon,
  classNames,
  pageUsername,
}: // myProfile,
SectionHeaderType) => {
  const { user }: any = useCurrentUser();

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        user?.username === pageUsername ? 'justify-between' : 'justify-start',
        classNames
      )}
    >
      <div className={cn('text-4xl font-bold text-shadow-lg')}>
        {' '}
        {icon && <div>{icon}</div>}
        <div>{name}</div>
      </div>
      {buttonLink && user?.username === pageUsername && (
        <Button className="move-button flex items-center gap-1">
          {buttonIcon && buttonIcon}
          <Link href={buttonLink}>{buttonTitle}</Link>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
