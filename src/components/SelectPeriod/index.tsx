"use client";
import { useContext } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const SelectPeriod = () => {
	const period = "day";

	return (
		<div className="w-[180px] bg-purple border-none flex justify-center items-center rounded-5xl  mb-5  h-[40px] align-middle shadow-lg ">
			<div className=" bg-white rounded-l-5xl h-full flex justify-center align-middle items-center px-2">
				<p className=" text-center  font-bold  text-lightPink">Period:</p>
			</div>
			<Select
				name="Period"
				defaultValue={period}
				onValueChange={(val: any) => {
					// changePeriod(val);
				}}
			>
				<SelectTrigger
					className="border-none on-select:border-none focus:ring-0"
					type="submit"
				>
					<SelectValue placeholder={period} />
				</SelectTrigger>
				<SelectContent className="-ml-12 text-lightPink">
					<SelectItem value="day">Day</SelectItem>
					<SelectItem value="week">Week</SelectItem>
					<SelectItem value="month">Month</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SelectPeriod;
