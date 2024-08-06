"use client";
import HeroBlob from "@/components/HomePage/HeroSection/HeroBlob";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoggedOut = () => {
	return (
		<div className=" largePhone:bg-home-bg-image dark:largePhone:bg-home-bg-dark bg-cover bg-center bg-no-repeat min-h-screen my-14 relative flex flex-col 
		largePhone:gap-y-8 bg-home-bg-image-phone overflow-hidden gap-y-52 dark:bg-home-bg-phone-dark">
			<div className="flex flex-col items-center mt-32 largePhone:mt-0 gap-y-3">
				<p
					className=" font-bold min-[1327px]:text-7xl min-[841px]:text-6xl min-[723px]:text-5xl text-4xl
      uppercase text-center  text-white"
				>
					follow our five step path
				</p>
				<Link className="w-48" href={"/auth/login"}>
					<Button className="move-button" size={"slg"}>
						Get Started
					</Button>
				</Link>
			</div>

			<div className="flex items-center largePhone:flex-row flex-col largePhone:gap-y-0 dark:largePhone:mt-44 largePhone:mt-16">
				<HeroBlob textOne="Share" textTwo="your story" number={"01"} />
				<HeroBlob textOne="Start or" textTwo="Join Tribe" number={"02"} />
				<HeroBlob textOne="Set" textTwo="Daily Tasks" number={"03"} />
				<HeroBlob textOne="Share" textTwo="Your Challenges" number={"04"} />
				<HeroBlob textOne="Stay" textTwo="Accountable" number={"05"} />
			</div>
		</div>
	);
};

export default LoggedOut;
