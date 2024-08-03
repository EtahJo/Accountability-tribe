import {useState} from "react";
import { CustomInputTypes } from "@/types/types";
import { withFormsy} from "formsy-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputLabel, { InputLabelProps } from "@/components/InputLabel/index";
import { cn } from "@/lib/utils";

const CustomInput = ({
	name,
	type,
	placeholder,
	textArea,
	required,
	changeEvent,
	value,
	errorMessage,
	isFormSubmitted,
	isValid,
	Icon,
	disabled,
	lable,
	className,
	inputClassNames,
	labelIcon,
	maxLength,
	setValue,
}: CustomInputTypes & InputLabelProps) => {
	const [charactersLeft, setCharactersLeft] = useState((maxLength as number)-value?.length)
	const onChange = (e: any) => {
		setValue(e.target.value);
		if(maxLength){
		setCharactersLeft(maxLength-e.target.value.length)
		}
		
	};
	return (
		<div>
			{lable && (
				<InputLabel lable={lable} labelIcon={labelIcon} required={required} />
			)}
			<div
				className={cn(
					"shadow-3xl bg-lighterPink rounded-3xl p-px my-4 flex align-middle max-[538px]:w-[200px] ",
					inputClassNames,
				)}
			>
				{textArea ? (
					<Textarea
						name={name}
						required={required}
						placeholder={placeholder}
						onChange={changeEvent || onChange}
						value={value}
						disabled={disabled}
						maxLength={maxLength}
						className={cn(
							"bg-transparent px-5 py-2 w-full placeholder:text-gray-400 focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none ",
							className,
						)}
					/>
				) : (
					<Input
						type={type}
						placeholder={placeholder}
						name={name}
						required={required}
						onChange={changeEvent || onChange}
						value={value}
						className="bg-transparent border-none"
						disabled={disabled}
						maxLength={maxLength}
					/>
				)}
				{Icon && (
					<div className="place-content-center cursor-pointer">{Icon}</div>
				)}
			</div>
			{
				maxLength&& <p className="-mt-3 mb-4 ml-2 text-lightPink text-sm">You have {charactersLeft} characters left</p>
			}
			{isFormSubmitted && !isValid && (
				<p className="text-red-500 font-bold">{errorMessage}</p>
			)}
		</div>
	);
};

export default withFormsy<CustomInputTypes, any>(CustomInput);
