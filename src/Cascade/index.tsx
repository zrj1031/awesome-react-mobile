/* eslint-disable react/prop-types */
import React, { FC, useState, useRef } from 'react';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import useFormatCols from './useFormatCols';
import useSelected from './useSelected';
import { ItemId, DataItem, FormatDataItem } from './PropsTypes';
import Icon from './Icon';
import './index.less';

interface Props {
  onSelect: (data: ItemId) => void;
  cascadeData: DataItem[];
  selectId?: ItemId;
}

const Cascade: FC<Props> = ({ onSelect, selectId, cascadeData }) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const cascadeRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [expand, setExpand] = useState(false);
  const { cols, setCols, fullIdQuery } = useFormatCols(cascadeData);
  const { selItem, setSelItem } = useSelected({
    fullIds: fullIdQuery[selectId!],
    cols,
    setCols,
  });

  useClickAway(() => {
    setExpand(false);
  }, [selectRef, cascadeRef, backRef]);

  const handleExpandSubCol = (index: number, item: FormatDataItem) => {
    setSelItem(item);
    const { children = [] } = item;
    if (children.length > 0) {
      setCols((pre) => {
        const final = [...pre];
        final.splice(index + 1, 1, children);
        return final;
      });
    } else {
      setExpand(false);
      onSelect(item.id);
    }
  };

  const handleBack = () => {
    setCols((pre) => {
      const final = [...pre];
      final.pop();
      return final;
    });
  };

  const handleSelectAll = (colIndex: number, col: FormatDataItem[]) => {
    const parentId = col[0].fullId?.[col[0].fullId?.length - 2];
    const allItem = cols[colIndex - 1].find((item) => item.id === parentId);
    setSelItem(allItem);
    onSelect(allItem!.id);
    setExpand(false);
  };

  return (
    <div className="fm-cascade-wrapper">
      <div
        ref={selectRef}
        className={classNames('fm-cascade-select', {
          active: expand,
          selected: !!selItem,
        })}
        onClick={() => setExpand((expand) => !expand)}
      >
        {selItem?.label || '请选择'}
      </div>

      <div
        ref={cascadeRef}
        className={classNames('cascade-column', { expand })}
        style={
          selectRef.current
            ? {
                top:
                  selectRef.current?.offsetTop +
                  selectRef.current?.getBoundingClientRect().height,
              }
            : {}
        }
      >
        {[...cols, []].map((col, colIndex) => (
          <div
            key={colIndex}
            className={classNames('col', {
              selectCol: colIndex === cols.length - 2,
              fullWidth: cols.length === 1,
            })}
            style={
              cols.length > 2
                ? { transform: `translateX(${(cols.length - 2) * -100}%)` }
                : {}
            }
          >
            {colIndex === cols.length - 2 && colIndex !== 0 && (
              <div className="item back" onClick={handleBack} ref={backRef}>
                <Icon type="allow-left" fontSize={12} />
                返回上一级
              </div>
            )}
            {colIndex === cols.length - 1 && (
              <div
                className="item all"
                onClick={() => handleSelectAll(colIndex, col)}
              >
                全部
              </div>
            )}
            {col.map((item) => (
              <div
                className={classNames('item', {
                  selected: selItem?.fullId?.includes(item.id),
                })}
                key={item.id}
                onClick={() => handleExpandSubCol(colIndex, item)}
              >
                {item.label}
                {!!item.children && <Icon type="allow-right" fontSize={12} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cascade;
