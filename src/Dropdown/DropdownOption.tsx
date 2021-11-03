import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { DropdownOptionProps, TOptionValue } from './PropsType';

const DropdownOption = forwardRef<HTMLDivElement, DropdownOptionProps>(
  (
    { direction, rect, activeColor, options, onChange, children, defaultValue },
    ref,
  ) => {
    const handleOptionClick = (value: TOptionValue, disabled: boolean) => {
      if (!disabled) {
        onChange(value);
      }
    };

    const calcOptionStyle = (
      optionValue: string | number,
      disabled: boolean,
    ) => {
      const style = {};
      Object.assign(style, {
        color: defaultValue === optionValue ? activeColor : '#333',
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
            ? options.map(
                ({ label, value: optionValue, disabled }, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={classNames('fm-cell fm-dropdown-item__option', {
                      'fm-dropdown-item__option--disabled': disabled,
                    })}
                    onClick={() => handleOptionClick(optionValue, !!disabled)}
                  >
                    <div
                      className="fm-cell__title"
                      style={calcOptionStyle(optionValue, !!disabled)}
                    >
                      {label}
                    </div>
                  </div>
                ),
              )
            : children}
        </div>
      </div>
    );
  },
);
DropdownOption.displayName = 'DropdownOption';

export default DropdownOption;
