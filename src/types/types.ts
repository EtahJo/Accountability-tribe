import { FormsyInjectedProps } from "formsy-react";
import { StaticImageData } from "next/image";

export type AuthContextType = {
	login: boolean;
	setLogin: () => void;
};
export type ButtonType = {
	text: string;
	type?: "submit" | "reset" | undefined;
};

export type SquareComponentType = {
	upperText: string;
	lowerText: string;
};

export type CarouselSlideType = {
	src: string;
};

export type CustomInputTypes = FormsyInjectedProps<any> & {
	type?: string;
	changeEvent?: (val: any) => void;
	placeholder?: string;
	textArea?: boolean;
	required?: boolean;
	Icon?: React.ReactElement;
	disabled?: boolean;
	className?: string;
	defaultValue?: any;
	lable?: string;
	labelIcon?: React.ReactNode;
	inputClassNames?: string;
	maxLength?:number;
};

export type CustomCheckboxProps = {
	label: string;
	checked: boolean;
	onChange: (val: any) => void;
} & FormsyInjectedProps<any>;

export type BackgroundSlideShowProps = {
	slides: { src: string }[];
	imageClass?: string;
	className?: string;
	asChild?: boolean;
};

export type CompletionLeveltype = {
	completionStatement?: string;
	percentage: string;
	title: string;
	completed?: boolean;
	carriedOver?: boolean;
	unCompleted?: boolean;
};
export type MovingTextType = {
	textOne: string;
	textTwo: string;
	colorUp?: boolean;
	colorDown?: boolean;
};
export type SectionHeaderType = {
	name: string;
	icon?: React.ReactElement;
	buttonTitle?: string;
	buttonLink?: string;
	classNames?: string;
	pageUsername?: string;
};

export type TribeSnippetType = {
	name: string;
	members: number;
};
