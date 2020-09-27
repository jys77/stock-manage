import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@ant-design/charts';
import { Empty, Typography, Divider, Spin, Avatar, Menu, Dropdown, Space, Button } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { getSellStats, logout } from '../actions';
export const Home = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSellStats());
    // eslint-disable-next-line
  }, []);
  const { user } = useSelector((state) => state.login);
  const { loading, data } = useSelector((state) => state.sellStats);
  const bye = () => {
    dispatch(logout());
    props.history.push('/');
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={bye}>登出</div>
      </Menu.Item>
    </Menu>
  );

  const config = {
    title: {
      visible: false,
      text: '最近七天销售额',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: '_id',
    yField: 'total',
    meta: {
      _id: { alias: '日期' },
      total: { alias: '销售额（元）' },
    },
    label: {
      visible: true,
      style: {
        fill: '#1890FF',
        fontSize: 12,
        fontWeight: 600,
        opacity: 0.6,
      },
    },
  };
  return (
    <div className="container">
      <Space style={{ float: 'right', margin: '1rem' }}>
        <Avatar icon={<UserOutlined />} />
        {user && (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button>
              {user.username} <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </Space>
      <Divider />
      <Typography.Title level={5}>最近七天销售额柱状图</Typography.Title>
      {loading ? (
        <Spin size="large" className="center" />
      ) : data ? (
        <Column {...config} />
      ) : (
        <Empty description="暂无数据" className="center" />
      )}
    </div>
  );
};
