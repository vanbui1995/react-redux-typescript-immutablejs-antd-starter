import React, { memo } from 'react';
import { useField } from 'formik';
import { Form } from 'antd';
import { ValidateStatus } from 'antd/lib/form/FormItem';
import UncontrollInput from '../UncontrolledInput/UncontrollInput';
import { ControlledInputProps } from '../type';

const ControlledInput = (props: ControlledInputProps) => {
  const { name, customFormProps, inputType, label, ...rest } = props;

  const [field, meta] = useField(name);

  let validateStatus: ValidateStatus = 'success';
  if (meta.touched) {
    validateStatus = meta.error ? 'error' : 'success';
  }

  return (
    <Form.Item
      {...(customFormProps || {})}
      label={label}
      hasFeedback={Boolean(meta.error)}
      help={meta.touched && meta.error}
      validateStatus={validateStatus}
    >
      <UncontrollInput inputType={inputType} {...rest} {...field} />
    </Form.Item>
  );
};

export default memo(ControlledInput);
