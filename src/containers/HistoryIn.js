import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker, Typography, Divider, Table, Spin, Empty, Statistic, Space } from 'antd';
import moment from 'moment';
import { historyIn } from '../actions';
import { mostVal } from '../utils';
const { RangePicker } = DatePicker;
export const HistoryIn = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.historyIn);
  const changeHandler = (values) => {
    if (values) {
      const date = values.map((moment) => {
        return new Date(moment).toISOString();
      });
      dispatch(historyIn(date[0], date[1]));
    }
  };

  const priceCalculate = (items) => {
    return items.reduce((acc, cur) => {
      return acc + cur.priceIn * cur.count;
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
      title: '进货单价',
      dataIndex: 'priceIn',
      render: (value, record) => <div>￥{record.priceIn.toFixed(2)}</div>,
    },
    {
      title: '金额',
      key: 'price',
      render: (value, record) => {
        const money = record.count * record.priceIn;
        return <div>￥{money.toFixed(2)}</div>;
      },
    },
    {
      title: '入库时间',
      dataIndex: 'timeIn',
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
            title="入库最多的类别"
            value={mostVal(data, 'category')}
            valueStyle={{ textAlign: 'center' }}
          />
          <Statistic
            title="入库最多的品牌"
            value={mostVal(data, 'brand')}
            valueStyle={{ textAlign: 'center' }}
          />
          <Statistic
            title="此段时间进货总额"
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
