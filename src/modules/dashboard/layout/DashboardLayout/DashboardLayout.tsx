import { ROUTE_PATH } from 'enums';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthAction, AuthSelectors } from 'redux/auth';
import { useTranslation } from 'react-i18next';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DashboardRoutes from '../DashboardRoutes/DashboardRoutes';

const { Header, Sider, Content } = Layout;

export default function DashboardLayoutRoutes() {
  const isLogged = !!useSelector(AuthSelectors.getAccessToken);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  useEffect(() => {
    if (!isLogged) {
      history.replace(ROUTE_PATH.LOGIN);
    }
  }, [isLogged, history]);
  const logOut = () => {
    dispatch(AuthAction.userSignOut());
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item onClick={logOut} key="3" icon={<UploadOutlined />}>
            {t('common.signout')}
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <DashboardRoutes />
        </Content>
      </Layout>
    </Layout>
  );
}
