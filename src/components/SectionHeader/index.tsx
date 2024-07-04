'use client';
import { useContext } from 'react';
import { SectionHeaderType } from '@/types/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
}: SectionHeaderType) => {
  const { myProfile } = useContext(MyProfileCheckContext);
  // const { myProfile } = useMyProfileCheck();
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
