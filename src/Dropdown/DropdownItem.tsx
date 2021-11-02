import React from 'react';
import { HOCDropdownItemPropsType, DropdownOptionValue } from './PropsType';

const DropdownItem: React.FC<HOCDropdownItemPropsType> = ({
  options,
  value,
  dropDownMenuValue,
  setDropDownMenuValue,
  activeColor,
  title = '',
  setActiveIndex,
}) => {
  const handleItemClick = () => {
    setActiveIndex();
    setDropDownMenuValue?.((pre: DropdownOptionValue) =>
      pre === value ? '' : value,
    );
  };
  return (
    <div className="fm-dropdown-menu__item" onClick={handleItemClick}>
      <div
        className="fm-dropdown-menu__title"
        style={{
          color: dropDownMenuValue === value ? activeColor : '#222',
        }}
      >
        {title || options?.find((option) => option.value === value)?.text}
      </div>
    </div>
  );
};

export default DropdownItem;
