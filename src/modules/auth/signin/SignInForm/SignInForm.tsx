import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction, AuthSelectors } from 'redux/auth';
import { useHistory } from 'react-router-dom';
import { ROUTE_PATH } from 'enums';

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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button loading={isSingingIn} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
