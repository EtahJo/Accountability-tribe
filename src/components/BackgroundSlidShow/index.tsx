'use client';
import React from 'react';
import { BackgroundSlideShowProps } from '@/types/types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import { cn } from '@/lib/utils';

const BackgroundSlideShow = ({
  slides,
  className,
  imageClass,
  asChild,
}: BackgroundSlideShowProps) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    innitialSlide: 0,
    pauseOnHover: asChild,
    autoplay: true,
    swipe: false,
    swipeToSlide: false,
    arrows: asChild,
    adaptiveHeight: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(' relative bg-lightPink bg-blend-normal', className)}
          >
            <CldImage
              src={slide.src}
              alt="slider image"
              priority
              fill
              className={cn(
                'fixed object-cover bottom-0 left-0 h-full bg-blend-normal',
                imageClass
              )}
            />
            <div className="bg-lightPink mix-blend-overlay absolute inset-0" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BackgroundSlideShow;
