'use client';
import { SectionHeaderType } from '@/types/types';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'flex items-center gap-3',
        pathname.endsWith(user.username) || !pathname.includes('user')
          ? 'justify-between'
          : 'justify-start',
        classNames
      )}
    >
      <div className={cn('text-4xl font-bold text-shadow-lg')}>
        {' '}
        {icon && <div>{icon}</div>}
        <div data-testid="section_title">{name}</div>
      </div>
      {buttonLink &&
        (pathname.endsWith(user.username) || !pathname.includes('user')) && (
          <Button className="move-button flex items-center gap-1">
            {buttonIcon && buttonIcon}
            <Link href={buttonLink}>{buttonTitle}</Link>
          </Button>
        )}
    </div>
  );
};

export default SectionHeader;
