"use client";
import { withFormsy } from "formsy-react";
import { useTimezoneSelect, allTimezones } from "react-timezone-select";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectItem,
} from "@/components/ui/select";
import InputLabel, { InputLabelProps } from "@/components/InputLabel/index";


interface TimeZoneInputProps {
	value: string;
	required?:boolean;
	onChange: (val: string) => void;
}
const timezones = {
	...allTimezones,
};

const TimeZoneInput = ({ value, onChange,lable,labelIcon,required }: TimeZoneInputProps&InputLabelProps) => {
	const { options, parseTimezone } = useTimezoneSelect({
		labelStyle: "original",
		timezones,
	});
	return (
		<div>
			{lable && (
				<InputLabel lable={lable} labelIcon={labelIcon} required={required} />
			)}
				<Select onValueChange={(e) => onChange(e)} defaultValue={value}>
			<SelectTrigger className="shadow-3xl bg-lighterPink  mt-5 rounded-5xl border-none py-5 max-[538px]:w-[200px]">
				<SelectValue placeholder="Please Select your Timezone" />
			</SelectTrigger>
			<SelectContent className="w-[300px]">
				{options.map((option, index) => (
					<SelectItem value={parseTimezone(option.value).value} key={index}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
		</div>
	
	);
};

export default withFormsy(TimeZoneInput);
