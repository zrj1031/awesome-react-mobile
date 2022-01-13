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
      // FIXME reduce的ts
      const selItem = fullIds?.reduce((acc, cur, index) => {
        const curItem = acc?.find((item) => item.id === cur);
        if (index === fullIds.length - 1) {
          return curItem as unknown as FormatDataItem[];
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          selCols.push(curItem?.children!);
          return curItem?.children as FormatDataItem[];
        }
      }, cols?.[0] ?? []) as unknown as FormatDataItem;

      setSelItem(selItem);
      setCols(selCols);
    }
  }, [fullIds]);

  return {
    selItem,
    setSelItem,
  };
}

export default useSelected;
