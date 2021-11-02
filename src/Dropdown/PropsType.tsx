import { ReactElement, ReactNode } from 'react';

export type TDirection = 'down' | 'up';

export type TOptionValue = string | number;

export type TOptions = {
  text: string;
  value: TOptionValue;
  disabled?: boolean;
}[];

export type DropdownMenuPropsType = {
  children: ReactElement<DropdownItemPropsType>[];
  activeColor: string;
  direction: TDirection;
};

export interface DropdownItemPropsType {
  options?: TOptions;
  title?: string;
  value: TOptionValue;
  onChange: (e: TOptionValue) => void;
  children?: ReactNode;
}

export interface IDropdownTitleProps {
  active: boolean;
  activeColor: string;
  onClick: () => void;
  title: string;
}

export interface IDropdownOptionProps {
  direction: TDirection;
  options: TOptions;
  value: TOptionValue;
  rect: DOMRect;
  activeColor: string;
  onChange: (e: TOptionValue) => void;
  children?: ReactNode;
}
