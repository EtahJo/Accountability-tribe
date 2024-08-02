"use client";
import { withFormsy, FormsyInjectedProps } from "formsy-react";
import CustomSelectInput, {
	CustomSelectInputProps,
} from "@/components/CustomSelectInput/index";
import { InputLabelProps } from "@/components/InputLabel/index";

const FormsySelectInput = ({
	setValue,
	value,
	placeholder,
	items,
	disabled,
	lable,
	onValueChange,
}: FormsyInjectedProps<any> & CustomSelectInputProps & InputLabelProps) => {
	//   const onValueChange = (selectedOption: any) => {
	//     setValue(selectedOption);
	//   };
	return (
		<CustomSelectInput
			onValueChange={onValueChange}
			placeholder={placeholder}
			value={value}
			items={items}
			disabled={disabled}
			lable={lable}
		/>
	);
};

export default withFormsy(FormsySelectInput);
