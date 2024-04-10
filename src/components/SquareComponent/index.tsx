import React from 'react';
import { SquareComponentType } from '@/types/types';

const SquareComponent = ({ upperText, lowerText }: SquareComponentType) => {
  return (
    <div className="relative my-4 -mb-6  phone:w-32 phone:h-32 sm:w-48 sm:h-48 w-28 h-28">
      <div className="bg-white rounded-5xl rotate-45 absolute w-full h-full " />
      <div className="absolute sm:top-10 top-5 left-px w-full items-center flex flex-col justify-center">
        <div className="text-center bg-purple rounded-5xl phone:h-14 phone:w-14 font-bold text-white phone:text-3xl p-4  items-center flex justify-center text-xl h-10 w-10">
          <p className="place-content-center">{upperText}</p>
        </div>
        <p className="font-bold text-center sm:text-2xl phone:text-sm text-xs ">
          {lowerText}
        </p>
      </div>
    </div>
  );
};

export default SquareComponent;
