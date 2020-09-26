import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select, DatePicker, InputNumber, Button, Spin, Tag, Space } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { searchItems } from '../actions';
import { debounce } from '../utils';
export const StockIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.searchedItems);

  const handleChange = (value) => {
    console.log(value);
  };

  let handleSearch = (value) => {
    dispatch(searchItems(value));
  };

  handleSearch = debounce(handleSearch);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="container">
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item
          label="入库时间"
          name="time"
          rules={[{ required: true, message: '请填写入库时间！' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="start" style={{ flexWrap: 'wrap' }}>
                    <Form.Item
                      className="search-box"
                      {...field}
                      label="选择物品"
                      name={[field.name, 'id']}
                      fieldKey={[field.fieldKey, 'id']}
                      rules={[{ required: true, message: '请选择物品！' }]}
                    >
                      <Select
                        showSearch
                        showArrow={false}
                        filterOption={false}
                        placeholder="输入关键词（如品牌名，商品名）"
                        notFoundContent={loading ? <Spin size="small" /> : null}
                        onChange={handleChange}
                        onSearch={handleSearch}
                      >
                        {data &&
                          data.map((item) => (
                            <Select.Option key={item.value} value={item.value}>
                              <Space size="small">
                                {item.text}
                                <Tag color={item.stock > 0 ? 'green' : 'red'}>
                                  库存: {item.stock}
                                  {item.unit}
                                </Tag>
                              </Space>
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="入库数量"
                      name={[field.name, 'count']}
                      fieldKey={[field.fieldKey, 'count']}
                      rules={[{ required: true, message: '请填写入库数量！' }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="进货单价(元)"
                      name={[field.name, 'price']}
                      fieldKey={[field.fieldKey, 'price']}
                      rules={[{ required: true, message: '请填写进货单价！' }]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <MinusCircleTwoTone onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    style={{ borderColor: '#1890FF', color: '#1890FF' }}
                  >
                    <PlusOutlined /> 添加记录
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交入库
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
