import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselSlide from '../Carousel/CarouselSlide';

const CommunityInteraction = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    innitialSlide: 0,
    pauseOnHover: true,
    autoplay: true,
  };
  const slides = [
    {
      src: '/image-1.jpeg',
    },
    {
      src: '/image-2.jpeg',
    },
    {
      src: '/image-3.jpeg',
    },
    {
      src: '/image-4.jpeg',
    },
    {
      src: '/image-5.jpeg',
    },
  ];

  return (
    <div className="bg-purple rounded-5xl m-10 grid grid-cols-12 items-center relative lg:mt-0 mt-48">
      <div className="relative lg:col-start-2 lg:col-end-7 col-start-2 col-end-12 lg:ml-0 ml-16">
        <div className="bg-white rounded-3xl h-80 w-80 rotate-45 absolute -top-32" />
        <div className="absolute left-8 -top-16 z-50 w-[50%]">
          <Slider {...settings}>
            {slides.map((slide) => (
              <CarouselSlide src={slide.src} />
            ))}
          </Slider>
        </div>
      </div>
      <div className="lg:col-start-7 lg:col-end-12 p-8 col-start-2 col-end-12 mt-56 lg:mt-0">
        <p className="font-bold text-6xl">
          Take A Look At Community Interactions and More
        </p>
      </div>
    </div>
  );
};

export default CommunityInteraction;
