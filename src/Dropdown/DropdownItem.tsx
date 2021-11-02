import React from 'react';
import { HOCDropdownItemPropsType } from './PropsType';

const DropdownItem: React.FC<HOCDropdownItemPropsType> = ({
  options,
  value,
  isOpening,
  activeColor,
  title = '',
  setActiveIndex,
}) => {
  const handleItemClick = () => {
    setActiveIndex();
  };
  return (
    <div className="fm-dropdown-menu__item" onClick={handleItemClick}>
      <div
        className="fm-dropdown-menu__title"
        style={{
          color: isOpening ? activeColor : '#222',
        }}
      >
        {title || options?.find((option) => option.value === value)?.text}
      </div>
    </div>
  );
};

export default DropdownItem;
