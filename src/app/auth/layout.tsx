import React from "react";
import BackgroundSlideShow from "@/components/BackgroundSlidShow/index";

interface AuthLayoutProps {
	children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
	const slides = [
		{ src: "v1718702194/ztkcydlsey7rtrrxnq7l.jpg" },
		{
			src: "v1718704071/eslhb9bgdycqw5d9r1re.jpg",
		},
		{
			src: "v1718702194/ztkcydlsey7rtrrxnq7l.jpg",
		},
	];
	return (
		<div className="align-middle flex justify-center">
			<div className="fixed right-0 w-full bottom-0 z-0 h-full ">
				<BackgroundSlideShow slides={slides} className="h-screen w-screen" />
			</div>
			<div
				className="flex phone:justify-around lg:gap-60 h-full lg:flex-row flex-col-reverse xl:gap-96 gap-x-0 pb-32 
      align-middle phone:gap-20 gap-y-20 lg:mt-32 mt-20 "
			>
				{children}
			</div>
		</div>
	);
};
export default AuthLayout;
