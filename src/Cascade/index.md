# Cascade

Demo:

```tsx
import React from 'react';
import { Cascade } from 'awesome-react-mobile';
const cascadeData = [
  {
    id: 'id-1',
    label: 'label-1',
    children: [
      {
        id: 'id-1-1',
        label: 'label-1-1',
      },
      {
        id: 'id-1-2',
        label: 'label-1-2',
      },
      {
        id: 'id-1-3',
        label: 'label-1-3',
        children: [
          {
            id: 'id-1-3-1',
            label: 'label-1-3-1',
          },
          {
            id: 'id-1-3-2',
            label: 'label-1-3-2',
          },
        ],
      },
    ],
  },
  {
    id: 'id-2',
    label: 'label-2',
    children: [
      {
        id: 'id-2-1',
        label: 'label-2-1',
      },
      {
        id: 'id-2-2',
        label: 'label-2-2',
      },
    ],
  },
];

export default () => (
  <div>
    <Cascade
      cascadeData={cascadeData}
      onSelect={(value) => {
        console.log(value);
      }}
    />
    <Cascade
      cascadeData={cascadeData}
      selectId="id-1-3-1"
      onSelect={(value) => {
        console.log(value);
      }}
    />
  </div>
);
```

## API

```ts
type Id = string | number;
```

| 参数        | 说明                               | 类型                                         | 默认值 |
| ----------- | ---------------------------------- | -------------------------------------------- | ------ |
| cascadeData | 级联选择器数据                     | Array< {id: Id, label: string, [children]} > | -      |
| selectId    | 指定当前选中的条目                 | Id                                           | -      |
| onSelect    | 被选中时调用，参数为选中项的 id 值 | (value: id) => void                          | -      |
