import { CustomInputProps } from './Inputs/CustomInput/CustomInput';
import { CustomSelectProps } from './Inputs/CustomSelect/CustomSelect';
import { FormItemProps } from 'antd/lib/form/FormItem';

export enum INPUT_TYPES {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
}

export type UncontrolledInputProps = CustomInputProps &
  CustomSelectProps & {
    inputType: INPUT_TYPES;
  };

export type ControlledInputProps = UncontrolledInputProps & {
  customFormProps?: FormItemProps;
  label?: string | null;
  name: string;
};
