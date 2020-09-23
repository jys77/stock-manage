import React from 'react';
import Cookie from 'js-cookie';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreAddOutlined, PayCircleOutlined, DatabaseOutlined } from '@ant-design/icons';
import { StockIn } from './StockIn';
import { Sell } from './Sell';
import { Manage } from './Manage';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export const Dashboard = () => {
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <NavLink to="/dashboard">首页</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" title="日常业务">
            <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
              <NavLink to="/dashboard/in">入库</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<PayCircleOutlined />}>
              <NavLink to="/dashboard/out">售出</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<DatabaseOutlined />}>
              <NavLink to="/dashboard/manage">物品管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="报表">
            <Menu.Item key="5">入库记录</Menu.Item>
            <Menu.Item key="6">售出记录</Menu.Item>
          </SubMenu>
          <Menu.Item key="7">数据导入</Menu.Item>
        </Menu>
      </Sider>
      <Content className="content">
        <Route path="/dashboard/in" component={StockIn} />
        <Route path="/dashboard/out" component={Sell} />
        <Route path="/dashboard/manage" component={Manage} />
      </Content>
    </Layout>
  );
};
