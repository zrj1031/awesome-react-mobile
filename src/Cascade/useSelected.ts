import { cloneDeep } from 'lodash-es';
import { useState, useEffect } from 'react';
import { ItemId, FormatDataItem, Cols } from './PropsTypes';

function useSelected({
  fullIds,
  cols,
  setCols,
}: {
  fullIds: ItemId[];
  cols: Cols;
  setCols: (params: Cols) => void;
}) {
  type SelItem = FormatDataItem | undefined;
  const [selItem, setSelItem] = useState<SelItem>(undefined);

  useEffect(() => {
    if (fullIds) {
      const selCols: FormatDataItem[][] = [cols?.[0]];
      const cFullIds = cloneDeep(fullIds);
      const selfId = cFullIds.pop();
      const selItem = cFullIds?.reduce((acc, cur) => {
        const curItem = acc?.find((item) => item.id === cur) as FormatDataItem;
        selCols.push(curItem.children!);
        return curItem?.children as FormatDataItem[];
      }, cols?.[0] ?? []);

      setSelItem(selItem?.find((item) => item.id === selfId));
      setCols(selCols);
    }
  }, [fullIds]);

  return {
    selItem,
    setSelItem,
  };
}

export default useSelected;
