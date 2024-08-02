"use client";
import CustomMultipleSelectInput from "@/components/CustomMultipleSelectInput/index";
import { withFormsy, FormsyInjectedProps } from "formsy-react";
import { cn } from "@/lib/utils";
import InputLabel, { InputLabelProps } from "@/components/InputLabel/index";
interface OptionType {
	id: string;
	title: string;
}

const SelectTasks = ({
	setValue,
	value,
	labelIcon,
	lable,
	inputClass,
	required,
	options, // a list of  all user tasks that are not yet added to session
}: FormsyInjectedProps<OptionType> & {
	options: OptionType[];
	inputClass?: string;
} & InputLabelProps) => {
	const onChange = (selectedOptions: any) => {
		setValue(selectedOptions);
	};
	return (
		<div>
			{lable && (
				<InputLabel lable={lable} labelIcon={labelIcon} required={required} />
			)}
			<CustomMultipleSelectInput
				value={value}
				options={options?.map((options) => ({
					value: options.id,
					label: options.title,
				}))}
				onChange={onChange}
			/>
		</div>
	);
};

export default withFormsy(SelectTasks);
