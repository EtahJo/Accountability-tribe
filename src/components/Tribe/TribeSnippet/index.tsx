import React from 'react';
import { TribeSnippetType } from '@/types/types';

const TribeSnippet = ({ name, members }: TribeSnippetType) => {
  return (
    <div className="bg-purple rounded-3xl m-4 w-4/12  place-items-center shadow-buttonInner py-px px-3">
      {' '}
      <p className="text-center text-white font-bold">{name}</p>
      <span className="flex justify-center gap-0.5">
        <p>{members}</p> <p>members</p>
      </span>
    </div>
  );
};

export default TribeSnippet;
