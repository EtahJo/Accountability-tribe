"use client";
import ReactFlagsSelect from "react-flags-select";
import { withFormsy } from "formsy-react";
import InputLabel, { InputLabelProps } from "@/components/InputLabel/index";

interface CountryInputProps {
	selected: string | undefined;
	onSelect: (val: any) => void;
	disabled: boolean;
	required?:boolean;
}

const CountryInput = ({ selected, onSelect, disabled,labelIcon,lable,required }: CountryInputProps & InputLabelProps) => {
	return (
		<div className="max-[538px]:w-[200px] ">
				{lable && (
				<InputLabel lable={lable} labelIcon={labelIcon} required={required} />
			)}
			
			<ReactFlagsSelect
				selected={selected as string}
				onSelect={onSelect}
				disabled={disabled}
				selectButtonClassName="!border-none !text-black !text-sm !-py-2"
				placeholder="Select Country"
				className="shadow-3xl bg-lighterPink  rounded-5xl !placeholder:text-sm dark:bg-dark-lightPrimary dark:!text-black"
				searchable
				searchPlaceholder="Search Country"
			/>
			
			
		</div>
	);
};

export default withFormsy<CountryInputProps & InputLabelProps, any>(CountryInput);
