import React, { useEffect } from 'react';
import { Button, Form } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction, AuthSelectors } from 'redux/auth';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATH } from 'enums';
import { useTranslation } from 'react-i18next';
import { ControlledInput } from 'modules/common';
import { INPUT_TYPES } from 'modules/common/input/type';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const initialValues: { email: string; password: string } = {
  email: '',
  password: '',
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().trim().required('Required').email('Invalid email'),
  password: Yup.string().required('Required'),
});

export default function SignInForm() {
  const isLogged = !!useSelector(AuthSelectors.getAccessToken);
  const isSingingIn = !!useSelector(AuthSelectors.getIsSigning);
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    if (isLogged) {
      history.replace(ROUTE_PATH.DASHBOARD);
    }
  }, [isLogged, history]);

  const dispatch = useDispatch();
  const onFinish = (values: { password: string; email: string }) => {
    dispatch(AuthAction.userSignIn(values.email, values.password));
  };
  return (
    <Formik
      onSubmit={onFinish}
      initialValues={initialValues}
      validationSchema={LoginSchema}
      render={({ handleSubmit }) => (
        <Form {...layout} onFinish={handleSubmit}>
          <ControlledInput
            inputType={INPUT_TYPES.INPUT} // inputType used to determine using our specific custom input
            type={'email'} // type is a prop of Input Ant component
            name="email"
            label={t('common.email')}
          />

          <ControlledInput
            inputType={INPUT_TYPES.INPUT}
            type={'password'}
            name="password"
            label={t('common.password')}
          />

          <ControlledInput
            placeholder={t('common.select')}
            inputType={INPUT_TYPES.SELECT}
            options={[
              {
                label: 'Option 1',
                value: 'option1',
              },
              {
                label: 'Option 2',
                value: 'option2',
              },
            ]}
            name="zigvy"
            label={t('common.select')}
          />

          <Form.Item {...tailLayout}>
            <Button loading={isSingingIn} type="primary" htmlType="submit">
              {t('common.submit')}
            </Button>
          </Form.Item>
        </Form>
      )}
    ></Formik>
  );
}
