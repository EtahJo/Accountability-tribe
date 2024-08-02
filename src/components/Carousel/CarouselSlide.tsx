import { CarouselSlideType } from "@/types/types";
import React from "react";
import Image from "next/image";

const CarouselSlide = ({ src }: CarouselSlideType) => {
	return (
		<div>
			<Image
				src={src}
				width={250}
				height={300}
				alt="carousel image"
				className="object-cover border-5 border-lightPink rounded-5xl"
			/>
		</div>
	);
};

export default CarouselSlide;
