import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, Select, Alert, Table, Empty, Spin, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addItem, getItems, getFilters } from '../actions';
import { units, categories } from '../constants';
export const Manage = () => {
  const dispatch = useDispatch();
  const { loading: newAddLoading, error: newAddError, data } = useSelector((state) => state.newAdd);
  const { loading: itemsLoading, error: itemsError, items } = useSelector((state) => state.items);
  const { cats, brands, names } = useSelector((state) => state.filter);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [cat, setCat] = useState(null);
  const [unit, setUnit] = useState(null);

  const submitHandler = () => {
    if (name && unit && cat) {
      setTimeout(() => {
        setShowModal((prev) => !prev);
        form.resetFields();
        setShowAlert(true);
        dispatch(getItems());
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }, 500);
      dispatch(
        addItem({
          name,
          brand,
          model,
          unit,
          category: cat,
        })
      );
    } else {
    }
  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getFilters('categories'));
    dispatch(getFilters('brands'));
    dispatch(getFilters('names'));
    // eslint-disable-next-line
  }, []);

  const cancelHandler = () => {
    setShowModal(false);
    form.resetFields();
    setName(null);
    setCat(null);
    setBrand(null);
    setModel(null);
    setUnit(null);
  };

  const formDataHandler = ({ name, cat, brand, model, unit }) => {
    if (name) setName(name);
    if (cat) setCat(cat);
    if (brand) setBrand(brand);
    if (model) setModel(model);
    if (unit) setUnit(unit);
  };

  const columns = [
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      filters: cats ? cats : [],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => {
        let stringA = a.category.toUpperCase();
        let stringB = b.category.toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      filters: names ? names : [],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        let stringA = a.name.toUpperCase();
        let stringB = b.name.toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      filters: brands ? brands : [],
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
      sorter: (a, b) => {
        let stringA = a.brand.toUpperCase();
        let stringB = b.brand.toUpperCase();
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="small">
          <a href="/">编辑</a>
          <a href="/">删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="content-manage">
      <Button
        className="add-btn"
        type="primary"
        shape="round"
        icon={<PlusOutlined />}
        size="medium"
        onClick={() => setShowModal((prev) => !prev)}
      >
        添加物品
      </Button>
      {showAlert ? (
        <Alert
          message={data ? data.msg : newAddError ? newAddError.msg : null}
          type={data ? 'success' : 'error'}
          style={{
            marginTop: '1rem',
          }}
          showIcon
          closable
        />
      ) : null}
      <Modal
        title="添加物品"
        visible={showModal}
        okText="提交"
        cancelText="取消"
        onOk={submitHandler}
        confirmLoading={newAddLoading}
        onCancel={cancelHandler}
      >
        <Form
          layout="horizontal"
          form={form}
          onValuesChange={formDataHandler}
          labelCol={{
            span: 4,
            offset: 2,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请填写商品名称！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="类别"
            name="cat"
            rules={[{ required: true, message: '请选择商品类别！' }]}
          >
            <Select>
              {categories.map((category, index) => (
                <Select.Option key={'cat' + index} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="品牌" name="brand">
            <Input />
          </Form.Item>
          <Form.Item label="型号" name="model">
            <Input />
          </Form.Item>
          <Form.Item
            label="单位"
            name="unit"
            rules={[{ required: true, message: '请选择计量单位！' }]}
          >
            <Select>
              {units.map((unit, index) => (
                <Select.Option key={'unit' + index} value={unit}>
                  {unit}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {itemsLoading ? (
        <Spin size="large" className="center" />
      ) : items ? (
        <Table
          rowKey="row"
          locale={{
            cancelSort: '点击取消排序',
            triggerAsc: '点击升序',
            triggerDesc: '点击降序',
            filterReset: '重置',
            filterConfirm: '确认',
          }}
          columns={columns}
          dataSource={items}
        />
      ) : itemsError ? (
        <div></div>
      ) : (
        <Empty description="暂无数据" className="center" />
      )}
    </div>
  );
};
