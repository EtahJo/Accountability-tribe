'use client';
import MainButton from '@/components/Button/MainButton';
import SquareComponent from '@/components/SquareComponent/index';
import { CldImage } from 'next-cloudinary';
import HeroBlob from '@/components/HomePage/HeroSection/HeroBlob';

const LoggedOut = () => {
  return (
    <div className="grid grid-cols-12  bg-home-bg-image bg-cover bg-center bg-no-repeat min-h-screen m-14 relative">
      <p
        className=" font-bold min-[1327px]:text-7xl min-[841px]:text-6xl min-[723px]:text-5xl min-[391px]:text-3xl text-xl
      uppercase min-[1107px]:w-[400px] min-[841px]:w-[300px] min-[583px]:w-[200px] w-[100x]  min-[1309px]:m-20 min-[583px]:m-10 m-5"
      >
        follow our five step path
      </p>
      <div className="col-start-9 col-end-11 min-[666px]:flex items-end mb-44 mr-10 hidden">
        <p
          className="text-white text-center font-bold min-[1327px]:text-7xl min-[896px]:text-5xl min-[723px]:text-4xl  text-xl
      uppercase"
        >
          Stay Consistent
        </p>
      </div>
      <div className="absolute left-[30%] top-12">
        <HeroBlob />
      </div>

      {/* <div className="lg:col-start-2 lg:col-end-6 col-start-2 col-end-11 ">
      
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
      </div> */}
    </div>
  );
};

export default LoggedOut;
