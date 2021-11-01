/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, createRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { DropdownMenuPropsType } from './PropsType';
import DropdownItem from './DropdownItem';
import './index.less';
import DropdownOption from './DropdownOption';
import { useClickAway } from 'ahooks';

const DropdownMenu: React.FC<DropdownMenuPropsType> & {
  DropdownItem?: any;
} = ({ activeColor = '#1989fa', direction = 'down', children }) => {
  const [dropDownMenuValue, setDropDownMenuValue] = useState('');
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef(null);
  const itemRefs = useRef(children.map(() => createRef<HTMLDivElement>()));
  const [activeIndex, setActiveIndex] = useState<number>();

  useClickAway(() => {
    setDropDownMenuValue('');
  }, [navRef, itemRefs.current[activeIndex!]]);

  useEffect(() => {
    if (dropDownMenuValue) {
      document.body.classList.add('fm-overflow-hidden');
    } else {
      document.body.classList.remove('fm-overflow-hidden');
    }
  }, [dropDownMenuValue]);

  return (
    <div className="fm-dropdown-menu" ref={dropDownMenuRef}>
      <div
        className={classNames('fm-dropdown-menu_bar', {
          'fm-dropdown-menu_bar--opened': !!dropDownMenuValue,
        })}
        ref={navRef}
      >
        {children.map((Item, index) => (
          <DropdownItem
            {...Item.props}
            key={index}
            dropDownMenuValue={dropDownMenuValue}
            setDropDownMenuValue={setDropDownMenuValue}
            setActiveIndex={() => setActiveIndex(index)}
            activeColor={activeColor}
          />
        ))}
      </div>
      {children.map(
        (
          {
            props: { options, value, onChange, children: DropdownItemChildren },
          },
          index,
        ) => (
          <CSSTransition
            in={value === dropDownMenuValue}
            timeout={0}
            classNames={direction}
            unmountOnExit
            key={value}
          >
            <DropdownOption
              ref={itemRefs.current[index]}
              direction={direction}
              rect={dropDownMenuRef.current?.getBoundingClientRect()}
              activeColor={activeColor}
              options={options}
              value={value}
              onChange={(newValue: any) => {
                onChange(newValue);
                setDropDownMenuValue('');
              }}
              DropdownItemChildren={DropdownItemChildren}
            />
          </CSSTransition>
        ),
      )}
    </div>
  );
};

export default DropdownMenu;
