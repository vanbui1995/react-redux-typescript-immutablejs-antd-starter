import React, { memo } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

export type CustomSelectProps = SelectProps<string | number> & {};

const CustomSelect = (props: CustomSelectProps) => {
  return <Select {...props} />;
};

export default memo(CustomSelect);
