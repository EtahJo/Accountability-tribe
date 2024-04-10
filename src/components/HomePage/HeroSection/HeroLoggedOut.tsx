import MainButton from '@/components/Button/MainButton';
import React from 'react';
import SquareComponent from '@/components/SquareComponent/index';

const LoggedOut = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-7 ">
        <p className=" font-bold text-5xl uppercase leading-tight">
          follow our 5 step game plan to keep
        </p>
        <p className="uppercase font-bold text-5xl text-white">
          You Consistent
        </p>
        <div className="h-0.5 w-full bg-black" />
        <MainButton text="Get started" />
      </div>
      <div className="col-start-8 col-end-11">
        <div>
          <SquareComponent upperText="01" lowerText="Share Your Story" />
        </div>
        <div>
          <SquareComponent upperText="02" lowerText="Start or Join Tribe" />
        </div>
        <div>
          <SquareComponent upperText="01" lowerText="Set Daily Tasks" />
        </div>
        <div>
          <SquareComponent upperText="01" lowerText="Share Your Challenges" />
        </div>
        <div>
          <SquareComponent upperText="01" lowerText="Stay Accountable" />
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;
