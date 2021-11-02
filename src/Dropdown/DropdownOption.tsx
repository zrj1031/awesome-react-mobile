import React, { forwardRef } from 'react';
import classNames from 'classnames';
interface IProp {
  direction: 'down' | 'up';
  rect: any;
  activeColor: any;
  options: any;
  value: any;
  onChange: any;
  DropdownItemChildren: any;
}

const DropdownOption = forwardRef<HTMLDivElement, IProp>(
  (
    {
      direction,
      rect,
      activeColor,
      options,
      value,
      onChange,
      DropdownItemChildren,
    },
    ref,
  ) => {
    const handleOptionClick = (callback: () => void, disabled: boolean) => {
      if (!disabled) {
        callback();
      }
    };

    const calcOptionStyle = (
      value: string | number,
      optionValue: string | number,
      disabled: boolean,
    ) => {
      const style = {};
      Object.assign(style, {
        color: value === optionValue ? activeColor : '#333',
      });
      if (disabled) {
        Object.assign(style, {
          color: '#999',
        });
      }
      return style;
    };

    return (
      <div
        className="fm-dropdown-item"
        style={
          direction === 'down'
            ? {
                top: rect?.bottom,
                bottom: 0,
              }
            : {
                top: 0,
                // bottom: `calc(100vh - ${dropDownMenuRef.current?.getBoundingClientRect().top}px)`,
                bottom: `calc(${window.innerHeight}px - ${rect?.top}px)`,
              }
        }
      >
        <div className="fm-overlay" />
        <div
          className="fm-dropdown-item__content"
          style={direction === 'down' ? { top: 0 } : { bottom: 0 }}
          ref={ref}
        >
          {options?.length > 0
            ? (
                options as {
                  text: string | number;
                  value: string | number;
                  disabled: boolean;
                }[]
              ).map(({ text, value: optionValue, disabled }, optionIndex) => (
                <div
                  key={optionIndex}
                  className={classNames('fm-cell fm-dropdown-item__option', {
                    'fm-dropdown-item__option--disabled': disabled,
                  })}
                  onClick={() =>
                    handleOptionClick(() => onChange(optionValue), disabled)
                  }
                >
                  <div
                    className="fm-cell__title"
                    style={calcOptionStyle(value, optionValue, disabled)}
                  >
                    {text}
                  </div>
                </div>
              ))
            : DropdownItemChildren}
        </div>
      </div>
    );
  },
);
DropdownOption.displayName = 'DropdownOption';

export default DropdownOption;
