import React from 'react';
import { ButtonType } from '@/types/types';

const MainButton = ({ text }: ButtonType) => {
  return (
    <div className="bg-purple rounded-full p-2 hover:bg-black shadow-lg w-4/12 m-2 cursor-pointer">
      <p className="uppercase text-white font-bold text-center text-xl">
        {text}
      </p>
    </div>
  );
};

export default MainButton;
