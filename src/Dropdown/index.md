# Dropdown

Demo:

```tsx
import React, { useState } from 'react';
import { DropdownMenu } from 'awesome-react-mobile';
const dropdownOptions1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2, disabled: true },
];
const dropdownOptions2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
];

const DropdownItem = DropdownMenu.DropdownItem;

export default () => {
  const [dropDownValue1, setDropDownValue1] = useState(0);
  const [dropDownValue2, setDropDownValue2] = useState('a');

  return (
    <div className="dropdown-container">
      <DropdownMenu>
        <DropdownItem
          options={dropdownOptions1}
          value={dropDownValue1}
          onChange={setDropDownValue1}
        />
        <DropdownItem
          options={dropdownOptions2}
          value={dropDownValue2}
          onChange={setDropDownValue2}
        />
      </DropdownMenu>
    </div>
  );
};
```

## API

### DropdownMenu Props

| 参数        | 说明                       | 类型                | 默认值    |
| ----------- | -------------------------- | ------------------- | --------- |
| activeColor | 菜单标题和选项的选中态颜色 | string              | '#1989fa' |
| direction   | 菜单展开方向，可选值为 up  | Enum {'down', 'up'} | 'down'    |

### DropdownItem Props

| 参数    | 说明                   | 类型                 | 默认值 |
| ------- | ---------------------- | -------------------- | ------ |
| value   | 当前选中项对应的 value | string &#124; number | -      |
| options | 选项数组               | Option[]             | []     |

### Option 数据结构

| 参数  | 说明   | 类型                 |
| ----- | ------ | -------------------- |
| text  | 文字   | string               |
| value | 标识符 | string &#124; number |
