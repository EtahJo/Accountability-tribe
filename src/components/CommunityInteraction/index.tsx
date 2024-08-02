"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselSlide from "../Carousel/CarouselSlide";

const CommunityInteraction = () => {
	const settings = {
		// dots: true,
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
			src: "/image-1.jpeg",
		},
		{
			src: "/image-2.jpeg",
		},
		{
			src: "/image-3.jpeg",
		},
		{
			src: "/image-4.jpeg",
		},
		{
			src: "/image-5.jpeg",
		},
	];

	return (
		<div className="bg-purple rounded-5xl m-10 grid grid-cols-12 items-center relative lg:mt-0 mt-48">
			<div className="relative lg:col-start-2 lg:col-end-7 col-start-2 col-end-12 lg:ml-0 ml-16">
				<div className="bg-white rounded-3xl largePhone:h-80 largePhone:w-80 rotate-45 absolute largePhone:-top-40 350:h-60 350:w-60 -left-16 largePhone:left-0 h-52 w-52 -top-20" />
				<div className="absolute largePhone:left-8 medPhone:-top-16 -top-10 z-50 largePhone:w-60 medPhone:w-52 w-48 -left-12">
					<Slider {...settings}>
						{slides.map((slide, index) => (
							<CarouselSlide src={slide.src} key={index} />
						))}
					</Slider>
				</div>
			</div>
			<div className="lg:col-start-7 lg:col-end-12 p-8 col-start-2 col-end-12 mt-56 lg:mt-0">
				<p className="font-bold medPhone:text-5xl largePhone:text-6xl text-3xl">
					Take A Look At Community Interactions and More
				</p>
			</div>
		</div>
	);
};

export default CommunityInteraction;
