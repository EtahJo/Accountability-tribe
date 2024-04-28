import MainButton from '@/components/Button/MainButton';
import React from 'react';
import SquareComponent from '@/components/SquareComponent/index';

const LoggedOut = () => {
  return (
    <div className="grid grid-cols-12 py-14  ">
      <div className="lg:col-start-2 lg:col-end-6 col-start-2 col-end-11 ">
        <p className=" font-bold sm:text-6xl uppercase leading-loose text-4xl">
          follow our 5 step game plan to keep
        </p>
        <p className="uppercase font-bold sm:text-6xl text-white text-4xl">
          You Consistent
        </p>
        <div className="h-0.5 w-full bg-black" />
        <MainButton text="Get started" />
      </div>
      <div className="lg:col-start-7 lg:col-end-12 grid grid-cols-12 col-start-2 col-end-11">
        <div className="col-start-1 col-end-4">
          <SquareComponent upperText="01" lowerText="Share Your Story" />
        </div>
        <div className="col-start-7 col-end-11">
          <SquareComponent upperText="02" lowerText="Start or Join Tribe" />
        </div>
        <div className="col-start-4 col-end-7">
          <SquareComponent upperText="03" lowerText="Set Daily Tasks" />
        </div>
        <div className="col-start-1 col-end-4">
          <SquareComponent upperText="04" lowerText="Share Your Challenges" />
        </div>
        <div className="col-start-7 col-end-11">
          <SquareComponent upperText="05" lowerText="Stay Accountable" />
        </div>
      </div>
    </div>
  );
};

export default LoggedOut;
