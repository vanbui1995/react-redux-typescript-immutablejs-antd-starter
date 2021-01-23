import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction, AuthSelectors } from 'redux/auth';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATH } from 'enums';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
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
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label={t(translations.common.email)}
        name="email"
        rules={[
          {
            required: true,
            message: t(translations.validation.messages.required),
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t(translations.common.password)}
        name="password"
        rules={[
          {
            required: true,
            message: t(translations.validation.messages.required),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={isSingingIn} type="primary" htmlType="submit">
          {t(translations.common.submit)}
        </Button>
      </Form.Item>
    </Form>
  );
}
