import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Typography, Divider, Table, Spin, Empty, Statistic, Space } from 'antd';
import moment from 'moment';
import { historyOut } from '../actions';
import { mostVal } from '../utils';
const { RangePicker } = DatePicker;
export const HistoryOut = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.historyOut);
  const changeHandler = (values) => {
    if (values) {
      const date = values.map((moment) => {
        return new Date(moment).toISOString();
      });
      dispatch(historyOut(date[0], date[1]));
    }
  };

  const priceCalculate = (items) => {
    return items.reduce((acc, cur) => {
      return acc + cur.priceOut * cur.count;
    }, 0);
  };

  const columns = [
    {
      title: '分类',
      dataIndex: 'category',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'count',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '售出单价',
      dataIndex: 'priceOut',
      render: (value, record) => <div>￥{record.priceOut.toFixed(2)}</div>,
    },
    {
      title: '金额',
      key: 'price',
      render: (value, record) => {
        const money = record.count * record.priceOut;
        return <div>￥{money.toFixed(2)}</div>;
      },
    },
    {
      title: '售出时间',
      dataIndex: 'timeOut',
      render: (time) => {
        const correctTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
        return correctTime;
      },
    },
  ];

  return (
    <div className="container">
      <Typography.Title level={5}>查询时间范围</Typography.Title>
      <RangePicker showTime onChange={changeHandler} />
      <Divider />
      {data && (
        <Space size="large" align="center" style={{ marginBottom: '1rem' }}>
          <Statistic
            title="售出最多的类别"
            value={mostVal(data, 'category')}
            valueStyle={{ textAlign: 'center' }}
          />
          <Statistic
            title="售出最多的品牌"
            value={mostVal(data, 'brand')}
            valueStyle={{ textAlign: 'center' }}
          />
          <Statistic
            title="此段时间销售总额"
            value={priceCalculate(data)}
            precision={2}
            prefix={'￥'}
            valueStyle={{ textAlign: 'center' }}
          />
        </Space>
      )}
      {loading ? (
        <Spin size="large" className="center" />
      ) : data ? (
        <Table columns={columns} dataSource={data} />
      ) : error ? (
        <Typography.Title>加载错误！</Typography.Title>
      ) : (
        <Empty description="暂无数据" className="center" />
      )}
    </div>
  );
};
