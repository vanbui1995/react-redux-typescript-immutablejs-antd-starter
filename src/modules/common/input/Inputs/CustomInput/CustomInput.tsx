import React, { memo } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export type CustomInputProps = InputProps & {};

const CustomInput = (props: CustomInputProps) => {
  return <Input {...props} />;
};

export default memo(CustomInput);
