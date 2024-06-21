import { FormsyInjectedProps } from 'formsy-react';
import React from 'react';
export type AuthContextType = {
  login: boolean;
  setLogin: () => void;
};
export type ButtonType = {
  text: string;
  type?: 'submit' | 'reset' | undefined;
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
  changeEvent: (val: any) => void;
  placeholder: string;
  textArea?: boolean;
  required?: boolean;
  Icon?: React.ReactElement;
  disabled?: boolean;
};

export type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (val: any) => void;
} & FormsyInjectedProps<any>;

export type BackgroundSlideShowProps = {
  slides: { src: string }[];
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
  buttonIcon?: React.ReactNode;
};

export type TribeSnippetType = {
  name: string;
  members: number;
};
export type TribeSnippetTwoType = {
  profileImage: StaticImageData;
  tribeName: string;
  members: number;
  description: string;
  link: string;
};
