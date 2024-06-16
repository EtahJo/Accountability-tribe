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
};

export type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (val: any) => void;
} & FormsyInjectedProps<any>;

export type BackgroundSlideShowProps = {
  slides: { src: string }[];
};
