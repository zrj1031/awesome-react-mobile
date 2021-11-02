import React from 'react';
import { IDropdownTitleProps } from './PropsType';

const DropdownItemTitle: React.FC<IDropdownTitleProps> = ({
  active,
  activeColor,
  onClick,
  title,
}) => {
  return (
    <div className="fm-dropdown-menu__item" onClick={onClick}>
      <div
        className="fm-dropdown-menu__title"
        style={{
          color: active ? activeColor : '#222',
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default DropdownItemTitle;
