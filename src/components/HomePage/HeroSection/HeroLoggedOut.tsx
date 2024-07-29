'use client';
import HeroBlob from '@/components/HomePage/HeroSection/HeroBlob';
import { Button } from '@/components/ui/button';

const LoggedOut = () => {
  return (
    <div className=" largePhone:bg-home-bg-image bg-cover bg-center bg-no-repeat min-h-screen my-14 relative flex flex-col gap-y-8 bg-home-bg-image-phone overflow-hidden">
      <div className="flex flex-col items-center">
        <p
          className=" font-bold min-[1327px]:text-7xl min-[841px]:text-6xl min-[723px]:text-5xl min-[391px]:text-3xl text-xl
      uppercase text-center  min-[1309px]:m-20 min-[583px]:m-10 m-5 text-white"
        >
          follow our five step path
        </p>
        <div className="w-48 -mt-14">
          <Button className="move-button" size={'slg'}>
            Get Started
          </Button>
        </div>
      </div>

      <div className="flex items-center largePhone:flex-row flex-col">
        <HeroBlob textOne="Share" textTwo="your story" number={'01'} />
        <HeroBlob textOne="Start or" textTwo="Join Tribe" number={'02'} />
        <HeroBlob textOne="Set" textTwo="Daily Tasks" number={'03'} />
        <HeroBlob textOne="Share" textTwo="Your Challenges" number={'04'} />
        <HeroBlob textOne="Stay" textTwo="Accountable" number={'05'} />
      </div>
    </div>
  );
};

export default LoggedOut;
