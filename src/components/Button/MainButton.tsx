import React from 'react';
import { ButtonType } from '@/types/types';

const MainButton = ({ text }: ButtonType) => {
  return (
    <button className="uppercase text-white font-bold text-center text-xl bg-purple rounded-full p-2 py-4 hover:bg-black shadow-lg m-2 cursor-pointer my-8">
      {text}
    </button>
  );
};

export default MainButton;
