import React from 'react';
import { SectionHeaderType } from '@/types/types';
import classNames from 'classnames';

const SectionHeader = ({ name, icon }: SectionHeaderType) => {
  return (
    <div className={classNames('text-4xl font-bold text-shadow-lg')}>
      {' '}
      {icon && <div>{icon}</div>}
      <div>{name}</div>
    </div>
  );
};

export default SectionHeader;
