import { ReactElement } from 'react';

export type DropdownOptionValue = string | number;

export type DropdownMenuPropsType = {
  children: ReactElement[];
  activeColor: string;
  direction: 'down' | 'up';
};

export interface DropdownItemPropsType {
  options?: {
    text: string;
    value: DropdownOptionValue;
    disabled?: boolean;
  }[];
  value: DropdownOptionValue;
}

export type HOCDropdownItemPropsType = DropdownItemPropsType & {
  dropDownMenuValue: DropdownOptionValue;
  setDropDownMenuValue: (e: any) => void;
  activeColor: string;
  title: string;
  setActiveIndex: () => void;
};
