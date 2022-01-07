export type ColId = string | number;

export type ColItem = {
  label: string;
  id: ColId;
  children?: ColItem[];
};

export type FormatColItem = ColItem & {
  parentId?: ColId;
};
