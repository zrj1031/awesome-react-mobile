import React, { useState, useRef, createRef } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useClickAway } from 'ahooks';
import { DropdownMenuPropsType, DropdownOptionValue } from './PropsType';
import DropdownItem from './DropdownItem';
import DropdownOption from './DropdownOption';
import useLock from './useLock';
import './index.less';

const DropdownMenu: React.FC<DropdownMenuPropsType> = ({
  activeColor = '#1989fa',
  direction = 'down',
  children,
}) => {
  const [dropDownMenuValue, setDropDownMenuValue] =
    useState<DropdownOptionValue>('');
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef(null);
  const itemRefs = useRef(children.map(() => createRef<HTMLDivElement>()));
  const [activeIndex, setActiveIndex] = useState<number>();

  useClickAway(() => {
    setDropDownMenuValue('');
  }, [barRef, itemRefs.current[activeIndex!]]);

  useLock(!!dropDownMenuValue);

  return (
    <div className="fm-dropdown-menu" ref={dropDownMenuRef}>
      <div
        className={classNames('fm-dropdown-menu__bar', {
          'fm-dropdown-menu__bar--opened': !!dropDownMenuValue,
        })}
        ref={barRef}
      >
        {children.map((item, index) => (
          <DropdownItem
            {...item.props}
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
            timeout={200}
            classNames={direction}
            unmountOnExit
            key={index}
          >
            <DropdownOption
              ref={itemRefs.current[index]}
              direction={direction}
              rect={dropDownMenuRef.current?.getBoundingClientRect()}
              activeColor={activeColor}
              options={options}
              value={value}
              onChange={(newValue: DropdownOptionValue) => {
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
