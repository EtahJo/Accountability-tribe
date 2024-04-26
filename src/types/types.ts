import { FormsyInjectedProps } from 'formsy-react';
export type AuthContextType = {
  login: boolean;
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
};
