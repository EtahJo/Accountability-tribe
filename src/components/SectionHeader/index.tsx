'use client';
import { useContext, useEffect } from 'react';
import { SectionHeaderType } from '@/types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/use-current-user';
// import { useMyProfileCheck } from '@/context/MyProfileCheckContext';
import { cn } from '@/lib/utils';
import { MyProfileCheckContext } from '@/context/MyProfileCheckContext';

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
  const { myProfile, myProfileCheck } = useContext(MyProfileCheckContext);
  const { user }: any = useCurrentUser();
  useEffect(() => {
    myProfileCheck(user?.username as string, pageUsername);
  }, []);
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        myProfile ? 'justify-between' : 'justify-start',
        classNames
      )}
    >
      <div className={cn('text-4xl font-bold text-shadow-lg')}>
        {' '}
        {icon && <div>{icon}</div>}
        <div>{name}</div>
      </div>
      {buttonLink && myProfile && (
        <Button className="move-button flex items-center gap-1">
          {buttonIcon && buttonIcon}
          <Link href={buttonLink}>{buttonTitle}</Link>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
