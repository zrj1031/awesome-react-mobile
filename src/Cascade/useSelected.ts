import { useState, useEffect } from 'react';
import { ColItem, ColId, FormatColItem } from './PropsTypes';

function useSelected({
  selectId,
  flatCols,
  setCols,
}: {
  selectId?: ColId;
  flatCols: ColItem[];
  setCols: (params: any) => void;
}) {
  const [selItem, setSelItem] = useState<FormatColItem | undefined>(undefined);

  const parentKeys: ColId[] = [];
  const findParentKeys = (arr: FormatColItem[], id: ColId) => {
    const self = arr.find((item) => item.id === id)!;
    if (self) {
      parentKeys.unshift(self.id);
      if (self?.parentId) {
        findParentKeys(arr, self.parentId);
      }
    }
    return parentKeys;
  };

  useEffect(() => {
    if (selectId) {
      const selItem = flatCols.find((item) => item.id === selectId);
      setSelItem(selItem);
      const keys = findParentKeys(flatCols, selectId);

      const formatCols: any[] = [];
      const formatColsFn = (arr: ColItem[], keys: (string | number)[]) => {
        const pKey = [...keys];
        const sk = pKey.shift();
        const self = arr.find((item) => item.id === sk);
        if (self) {
          formatCols.push(self.children);
          if (pKey.length > 0) {
            formatColsFn(arr, pKey);
          }
        }
        return formatCols;
      };
      const finalCols = formatColsFn(flatCols, keys);
      finalCols.pop();
      setCols((pre: any) => [...pre, ...finalCols]);
    }
  }, [selectId, flatCols]);

  return {
    selItem,
    setSelItem,
  };
}

export default useSelected;
