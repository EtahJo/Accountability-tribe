import React from 'react';
import { SectionHeaderType } from '@/types/types';
import classNames from 'classnames';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SectionHeader = ({
  name,
  icon,
  buttonLink,
  buttonTitle,
  buttonIcon,
}: SectionHeaderType) => {
  return (
    <div className="flex justify-between items-center">
      <div className={classNames('text-4xl font-bold text-shadow-lg')}>
        {' '}
        {icon && <div>{icon}</div>}
        <div>{name}</div>
      </div>
      {buttonLink && (
        <Button className="move-button flex items-center gap-1">
          {buttonIcon && buttonIcon}
          <Link href={buttonLink}>{buttonTitle}</Link>
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
