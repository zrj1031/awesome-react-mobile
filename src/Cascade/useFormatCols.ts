import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash-es';
import { DataItem, ItemId, FormatDataItem, Cols } from './PropsTypes';

function useFormatCols(initData: DataItem[]) {
  const [cols, setCols] = useState<Cols>([]);
  const [fullIdQuery, setFullIdQuery] = useState<Record<string, ItemId[]>>({});

  useEffect(() => {
    const formatCols = (
      arr: FormatDataItem[] = [],
      parentFullId?: ItemId[],
    ) => {
      arr.forEach((item) => {
        const selfFullId: ItemId[] = [...(parentFullId ?? []), item.id];
        setFullIdQuery((pre) => ({
          ...pre,
          [item.id]: selfFullId,
        }));
        Object.assign(item, {
          fullId: selfFullId,
        });
        if (item.children) {
          formatCols(item.children, item.fullId);
        }
      });
    };
    const finalCols = cloneDeep(initData);
    formatCols(finalCols);
    setCols([finalCols]);
  }, [initData]);

  return {
    fullIdQuery,
    cols,
    setCols,
  };
}

export default useFormatCols;
