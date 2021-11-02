import React, { useState, useRef, createRef, useMemo } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useClickAway } from 'ahooks';
import { DropdownMenuPropsType, TOptionValue } from './PropsType';
import DropdownTitle from './DropdownTitle';
import DropdownOption from './DropdownOption';
import useLock from './useLock';
import './index.less';

const DropdownMenu: React.FC<DropdownMenuPropsType> = ({
  activeColor = '#1989fa',
  direction = 'down',
  children,
}) => {
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef(null);
  const itemRefs = useRef(children.map(() => createRef<HTMLDivElement>()));
  const [activeIndex, setActiveIndex] = useState<number>();
  const showPopup = useMemo(() => activeIndex !== undefined, [activeIndex]);

  useClickAway(() => {
    setActiveIndex(undefined);
  }, [barRef, itemRefs.current[activeIndex!]]);

  useLock(showPopup);

  return (
    <div className="fm-dropdown-menu" ref={dropDownMenuRef}>
      <div
        className={classNames('fm-dropdown-menu__bar', {
          'fm-dropdown-menu__bar--opened': showPopup,
        })}
        ref={barRef}
      >
        {children.map(({ props: { options, value, title } }, index) => (
          <DropdownTitle
            key={index}
            title={
              options?.find((option) => option.value === value)?.text ?? title!
            }
            active={activeIndex === index}
            activeColor={activeColor}
            onClick={() =>
              setActiveIndex((pre) => (pre === index ? undefined : index))
            }
          />
        ))}
      </div>
      {children.map(
        (
          { props: { options, value, onChange, children: OptionChildren } },
          index,
        ) => (
          <CSSTransition
            in={index === activeIndex}
            timeout={200}
            classNames={direction}
            unmountOnExit
            key={index}
          >
            <DropdownOption
              ref={itemRefs.current[index]}
              direction={direction}
              rect={dropDownMenuRef.current?.getBoundingClientRect() as DOMRect}
              activeColor={activeColor}
              options={options!}
              value={value}
              onChange={(newValue: TOptionValue) => {
                onChange(newValue);
                setActiveIndex(undefined);
              }}
            >
              {OptionChildren}
            </DropdownOption>
          </CSSTransition>
        ),
      )}
    </div>
  );
};

export default DropdownMenu;
