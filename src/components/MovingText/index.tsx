import React from "react";
import { MovingTextType } from "@/types/types";
import classNames from "classnames";

const MovingText = ({
	textOne,
	textTwo,
	colorDown,
	colorUp,
}: MovingTextType) => {
	return (
		<div className="w-4/12 items-center relative text-center ">
			<p
				className={classNames(
					{
						[""]: colorUp,
					},
					"text-center font-bold text-5xl py-2 px-2 uppercase text-nowrap z-100 ",
				)}
			>
				{textOne}
			</p>
			{/* {colorUp && (
        // <div className="bg-purple rounded-full absolute top-5 h-10 w-full -z-20 animate-moveHori" />
      )} */}
			<p
				className={classNames(
					"text-center font-bold text-5xl py-2 uppercase text-nowrap  ",
					{
						[" rounded-full text-white"]: colorDown,
					},
				)}
			>
				{textTwo}
			</p>
		</div>
	);
};

export default MovingText;
