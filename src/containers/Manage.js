import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Alert,
  Table,
  Empty,
  Spin,
  Space,
  Popconfirm,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addItem, getItems, getFilters, updateItem } from '../actions';
import { units, categories } from '../constants';
import { EditModal } from '../components/editModal';
export const Manage = () => {
  const dispatch = useDispatch();
  const { loading: newAddLoading, error: newAddError, data } = useSelector((state) => state.newAdd);
  const { loading: itemsLoading, error: itemsError, items } = useSelector((state) => state.items);
  const { error: updatedError, data: updatedData } = useSelector((state) => state.updatedItem);
  const { cats, brands, names } = useSelector((state) => state.filter);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [cat, setCat] = useState(null);
  const [unit, setUnit] = useState(null);
  const [updatedTarget, setUpdatedTarget] = useState({});

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

  useEffect(() => {
    dispatch(getItems());
    //eslint-disable-next-line
  }, [updatedData]);

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

  const handleDelete = (id) => {
    dispatch(updateItem({ _id: id, valid: false }));
  };

  const updateHandler = ({ id, name, brand, category, model, stock, unit }) => {
    setShowEditModal(true);
    setUpdatedTarget({
      id,
      name,
      brand,
      category,
      model,
      stock,
      unit,
    });
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
          <Button
            type="primary"
            size="small"
            onClick={() =>
              updateHandler({
                id: record._id,
                name: record.name,
                brand: record.brand,
                category: record.category,
                model: record.model,
                stock: record.stock,
                unit: record.unit,
              })
            }
          >
            编辑
          </Button>
          <Popconfirm
            okText="确定"
            cancelText="取消"
            title="确定要删除？"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
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
          message={
            data
              ? data.msg
              : newAddError
              ? newAddError.msg
              : updatedData
              ? updatedData.msg
              : updatedError
              ? updatedError.msg
              : null
          }
          type={!updatedData && !data ? 'error' : 'success'}
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
      <EditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        setShowAlert={setShowAlert}
        id={updatedTarget && updatedTarget.id}
        name={updatedTarget && updatedTarget.name}
        brand={updatedTarget && updatedTarget.brand}
        category={updatedTarget && updatedTarget.category}
        model={updatedTarget && updatedTarget.model}
        stock={updatedTarget && updatedTarget.stock}
        unit={updatedTarget && updatedTarget.unit}
      />
      {itemsLoading ? (
        <Spin size="large" className="center" />
      ) : items ? (
        <Table columns={columns} dataSource={items} />
      ) : itemsError ? (
        <div></div>
      ) : (
        <Empty description="暂无数据" className="center" />
      )}
    </div>
  );
};
