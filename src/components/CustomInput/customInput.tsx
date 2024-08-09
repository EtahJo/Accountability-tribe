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
		if(changeEvent){
			changeEvent(e)
		}
		
	};
	const onBlurHandle= (e:any)=>{
 		const trimmedValue = e.target.value.trim();
		setValue(trimmedValue)
	}
	return (
		<div>
			{lable && (
				<InputLabel lable={lable} labelIcon={labelIcon} required={required} />
			)}
			<div
				className={cn(
					"shadow-3xl bg-lighterPink dark:bg-dark-lightPrimary rounded-3xl p-px my-4 flex align-middle max-[538px]:w-[200px] ",
					inputClassNames,
				)}
			>
				{textArea ? (
					<Textarea
						name={name}
						required={required}
						placeholder={placeholder}
						onChange={onChange}
						value={value}
						disabled={disabled}
						onBlur={onBlurHandle}
						maxLength={maxLength}
						className={cn(
							"bg-transparent px-5 py-2 w-full placeholder:text-gray-400 dark:placeholder:text-white focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 border-none ",
							className,
						)}
					/>
				) : (
					<Input
						type={type}
						placeholder={placeholder}
						name={name}
						required={required}
						onChange={onChange}
						onBlur={onBlurHandle}
						value={value}
						className="bg-transparent border-none placeholder:text-gray-400 dark:placeholder:text-white "
						disabled={disabled}
						maxLength={maxLength}
					/>
				)}
				{Icon && (
					<div className="place-content-center cursor-pointer my-auto p-1">{Icon}</div>
				)}
			</div>
			{
				maxLength&& <p className="-mt-3 mb-4 ml-2 text-lightPink dark:text-dark-primary text-sm">You have {charactersLeft} characters left</p>
			}
			{isFormSubmitted && !isValid && (
				<p className="text-red-500 font-bold">{errorMessage}</p>
			)}
		</div>
	);
};

export default withFormsy<CustomInputTypes, any>(CustomInput);
