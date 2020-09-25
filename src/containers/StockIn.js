import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, DatePicker, InputNumber, Button, Spin, Tag, Space } from 'antd';
import { searchItems } from '../actions';
import { debounce } from '../utils';
export const StockIn = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.searchedItems);

  const handleChange = (value) => {
    console.log(value);
  };

  let handleSearch = (value) => {
    dispatch(searchItems(value));
  };

  handleSearch = debounce(handleSearch);

  const handleSelect = (key) => {};

  return (
    <div className="container">
      <Form
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
      >
        <Form.Item label="入库时间">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item label="选择物品">
          <Select
            showSearch
            showArrow={false}
            filterOption={false}
            placeholder="输入关键词（如品牌名，商品名）"
            notFoundContent={loading ? <Spin size="small" /> : null}
            onChange={handleChange}
            onSearch={handleSearch}
            onSelect={handleSelect}
            defaultOpen={true}
          >
            {data &&
              data.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  <Space size="small">
                    {item.text}
                    <Tag color={item.stock > 0 ? 'green' : 'red'}>库存: {item.stock}</Tag>
                  </Space>
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="入库数量">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="进货单价">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item>
          <Button type="primary">提交入库</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
