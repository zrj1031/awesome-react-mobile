# Dropdown

Demo:

```tsx
import React from 'react';
import { DropdownMenu } from 'awesome-react-mobile';

const options = [
  [
    {
      label: '海淀区',
      value: 0,
      disabled: false,
    },
    {
      label: '丰台区',
      value: 1,
    },
    {
      label: '昌平区',
      value: 2,
      disabled: true,
    },
  ],
  [
    {
      label: '低楼层',
      value: 0,
      disabled: false,
    },
    {
      label: '中楼层',
      value: 1,
      disabled: true,
    },
    {
      label: '高楼层',
      value: 2,
    },
  ],
];

const Demo1 = () => {
  return (
    <div className="dropdown-container" style={{ margin: '20px 0' }}>
      <DropdownMenu
        options={options}
        onOptionChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

const Demo2 = () => {
  return (
    <div className="dropdown-container" style={{ margin: '100px 0' }}>
      <DropdownMenu
        options={options}
        defaultValues={[1, 2]}
        activeColor="#ee0a24"
        direction="up"
        onOptionChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

const Demo = () => (
  <>
    <Demo1 />
    <Demo2 />
  </>
);

export default Demo;
```

## API

```js
type OptionValue = string | number;
```

### DropdownMenu Props

| 参数          | 说明                       | 类型                         | 默认值    |
| ------------- | -------------------------- | ---------------------------- | --------- |
| options       | 下拉框展示的选择项         | OptionItem[][]               | -         |
| defaultValues | 初始选择项                 | OptionValue[]                | -         |
| onOptionClick | 点击选项时触发的回调函数   | (value: OptionValue) => void | -         |
| activeColor   | 菜单标题和选项的选中态颜色 | string                       | '#1989fa' |
| direction     | 菜单展开方向               | Enum {'down', 'up'}          | 'down'    |

### OptionItem 数据结构

| 参数     | 说明                              | 类型        |
| -------- | --------------------------------- | ----------- |
| label    | 选项名称                          | string      |
| value    | 选项标识                          | OptionValue |
| disabled | 选项是否可用，默认 false 表示可用 | boolean     |
