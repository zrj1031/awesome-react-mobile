export type ItemId = string | number;

export type DataItem = {
  label: string;
  id: ItemId;
  children?: DataItem[];
};

export type FormatDataItem = DataItem & {
  fullId?: ItemId[];
};

export type Cols = FormatDataItem[][];
