import React from "react";
import { ButtonType } from "@/types/types";

const MainButton = ({ text, type }: ButtonType) => {
	return (
		<div className="shadow-3xl rounded-full my-4">
			<button
				className="uppercase text-white font-bold text-center text-xl bg-purple rounded-full p-2 py-4 hover:bg-black cursor-pointer shadow-buttonInner w-full"
				type={type}
			>
				{text}
			</button>
		</div>
	);
};

export default MainButton;
