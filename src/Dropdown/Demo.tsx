import React from 'react';
import DropdownMenu from './index';

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
    <div className="dropdown-container" style={{ margin: '20px 0' }}>
      <DropdownMenu
        options={options}
        defaultValues={[1, 2]}
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
