import React, { memo } from 'react';
import { CustomInput, CustomSelect } from '../Inputs';
import { UncontrolledInputProps, INPUT_TYPES } from '../type';

const ControlledInput = (props: UncontrolledInputProps) => {
  let Input: null | typeof CustomInput | typeof CustomSelect = null;
  const { inputType, ...rest } = props;
  switch (inputType) {
    case INPUT_TYPES.INPUT:
      Input = CustomInput;
      break;
    case INPUT_TYPES.SELECT:
      Input = CustomSelect;
      break;
    default:
      break;
  }
  if (Input !== null) {
    return <Input {...rest} />;
  }
  return null;
};

export default memo(ControlledInput);
