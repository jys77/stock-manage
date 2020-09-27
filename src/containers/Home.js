import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from '@ant-design/charts';
import { Empty, Typography, Divider, Spin } from 'antd';
import { getSellStats } from '../actions';
export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSellStats());
  }, []);
  const { loading, data } = useSelector((state) => state.sellStats);
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
      <Divider></Divider>
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
