import React from 'react';
import { SquareComponentType } from '@/types/types';

const SquareComponent = ({ upperText, lowerText }: SquareComponentType) => {
  return (
    <div className="relative my-4">
      <div className="bg-white w-48 h-48 rounded-5xl rotate-45" />
      <div className="absolute top-10 left-10 w-full items-center flex flex-col justify-center">
        <div className="text-center bg-purple rounded-5xl h-20 w-20 font-bold text-white text-5xl p-4  items-center flex justify-center">
          <p className="place-content-center">{upperText}</p>
        </div>
        <p className="font-bold text-center">{lowerText}</p>
      </div>
    </div>
  );
};

export default SquareComponent;
