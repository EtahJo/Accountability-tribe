import React from 'react';
import { SectionHeaderType } from '@/types/types';
import classNames from 'classnames';

const SectionHeader = ({ name, icon }: SectionHeaderType) => {
  return (
    <div
      className={classNames(
        'bg-purple rounded-full shadow-buttonInner font-bold text-center px-2 py-px flex justify-center text-nowrap place-items-center'
      )}
    >
      {' '}
      <div>{name}</div>
      <div>{icon}</div>
    </div>
  );
};

export default SectionHeader;
