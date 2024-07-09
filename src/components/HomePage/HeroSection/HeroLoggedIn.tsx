// 'use client';
import BackgroundSlideShow from '@/components/BackgroundSlidShow/index';

const HeroLoggedIn = () => {
  const slides = [
    { src: '/bg-mountain.jpg' },
    {
      src: '/bg-tree.jpg',
    },
    {
      src: '/bg-sky.jpg',
    },
  ];
  return (
    <div>
      <div className="bg-white rounded-3xl grid grid-cols-12 h-[300px]  w-full relative">
        <div
          className="bg-lightPink rounded-br-3xl col-start-1 
        col-end-2 flex justify-center rounded-tl-3xl"
        >
          <p>Build Tribes</p>
        </div>
        <p>SlideShow</p>
        <div
          className=" col-start-11 col-span-2 
        w-full flex justify-center relative"
        >
          <div
            className="bg-purple absolute top-0 w-full h-[100px] border-l-2
         border-l-white rounded-bl-5xl before:absolute before:top-0 before:rounded-5xl before:bg-lightPink before:w-5
          before:h-5  before:-left-5 after:absolute after:-top-5 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:left-10 flex justify-center items-center "
          >
            <p>Be Accountable</p>
          </div>
        </div>
        <div className="col-start-10 col-end-12 w-full flex justify-center relative">
          <div
            className="bg-lightPink absolute bottom-0 w-full h-[100px] border-l-2
         border-l-white border-t-2 border-t-white rounded-tl-5xl border-r-2 border-r-white
         rounded-tr-5xl before:absolute before:bottom-0 before:rounded-5xl before:bg-transparent before:w-5
          before:h-5 before:shadow-roundright before:-right-5 after:absolute after:bottom-0 after:rounded-5xl after:bg-transparent after:w-5
          after:h-5 after:shadow-roundleft after:-left-5 flex justify-center items-center"
          >
            <p>Stay Consistent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLoggedIn;
