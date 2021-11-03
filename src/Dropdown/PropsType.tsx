export type TDirection = 'down' | 'up';

export type TOptionValue = string | number;

export type OptionsItem = {
  label: string;
  value: TOptionValue;
  disabled?: boolean;
};

export type DropdownMenuPropsType = {
  options: OptionsItem[][];
  defaultValues?: number[];
  values?: number[];
  onOptionChange?: (value: TOptionValue) => void;
  activeColor?: string;
  direction?: TDirection;
};

export interface IDropdownTitleProps {
  active: boolean;
  activeColor: string;
  onClick: () => void;
  title: string;
}

export interface DropdownOptionProps {
  direction: TDirection;
  options: OptionsItem[];
  rect: DOMRect;
  activeColor: string;
  defaultValue: TOptionValue;
  onChange: (e: TOptionValue) => void;
}
