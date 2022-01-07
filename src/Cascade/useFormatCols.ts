import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash-es';
import { ColItem, ColId } from './PropsTypes';

type FormatColItem = ColItem & {
  parentId?: ColId;
};

function useFormatCols(initCols: ColItem[]) {
  const [resultCols, setResultCols] = useState<FormatColItem[][]>([]);
  const [allCols, setAllCols] = useState<FormatColItem[][]>([]);

  const [flatCols, setFlatCols] = useState<FormatColItem[]>([]);

  useEffect(() => {
    const formatCols = (arr: ColItem[] = [], parentId?: ColId) => {
      arr.forEach((item) => {
        if (parentId) {
          Object.assign(item, {
            parentId,
          });
        }
        if (item.children) {
          formatCols(item.children, item.id);
        }
      });
    };
    const finalCols = cloneDeep(initCols);
    formatCols(finalCols);
    setResultCols([finalCols]);
    setAllCols([finalCols]);
  }, [initCols]);

  useEffect(() => {
    const finalCols: FormatColItem[] = [];
    const formatCols = (arr: ColItem[] = [], parentId?: ColId) => {
      arr.forEach((item) => {
        finalCols.push({
          ...item,
          parentId,
        });
        if (item.children) {
          formatCols(item.children, item.id);
        }
      });
    };
    formatCols(...cloneDeep(allCols));
    setFlatCols(finalCols);
  }, [allCols]);

  return {
    flatCols,
    cols: resultCols,
    setCols: setResultCols,
  };
}

export default useFormatCols;
