import React from 'react';
import Cookie from 'js-cookie';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  AppstoreAddOutlined,
  PayCircleOutlined,
  DatabaseOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { StockIn, Sell, Manage, HistoryIn, HistoryOut, Home } from '.';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const Dashboard = (props) => {
  return !Cookie.getJSON('user') ? (
    <Redirect to="/" />
  ) : (
    <Layout className="dashboard">
      <Sider
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: '1000',
        }}
        breakpoint="md"
        collapsedWidth="0"
      >
        <div className="dashboard-title">库存进出管理系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard']}
          defaultOpenKeys={['sub1', 'sub2']}
          selectedKeys={[props.history.location.pathname]}
        >
          <Menu.Item key="/dashboard">
            <NavLink exact to="/dashboard">
              首页
            </NavLink>
          </Menu.Item>
          <SubMenu key="sub1" title="日常业务">
            <Menu.Item key="/dashboard/in" icon={<AppstoreAddOutlined />}>
              <NavLink to="/dashboard/in">入库</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/out" icon={<PayCircleOutlined />}>
              <NavLink to="/dashboard/out">售出</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/manage" icon={<DatabaseOutlined />}>
              <NavLink to="/dashboard/manage">物品管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="历史记录">
            <Menu.Item key="/dashboard/history-in" icon={<BarsOutlined />}>
              <NavLink to="/dashboard/history-in">入库记录</NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/history-out" icon={<BarsOutlined />}>
              <NavLink to="/dashboard/history-out">售出记录</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Content className="content">
        <Route path="/dashboard" exact component={Home} />
        <Route path="/dashboard/in" component={StockIn} />
        <Route path="/dashboard/out" component={Sell} />
        <Route path="/dashboard/manage" component={Manage} />
        <Route path="/dashboard/history-in" component={HistoryIn} />
        <Route path="/dashboard/history-out" component={HistoryOut} />
      </Content>
    </Layout>
  );
};
