import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { categories, units } from '../constants';
import { updateItem, getItems } from '../actions';
export const EditModal = ({
  showEditModal,
  setShowEditModal,
  setShowAlert,
  id,
  name,
  brand,
  category,
  model,
  stock,
  unit,
}) => {
  const { loading } = useSelector((state) => state.updatedItem);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedBrand, setUpdatedBrand] = useState(brand);
  const [updatedCat, setUpdatedCat] = useState(category);
  const [updatedModel, setUpdatedModel] = useState(model);
  const [updatedStock, setUpdatedStock] = useState(stock);
  const [updatedUnit, setUpdatedUnit] = useState(unit);
  useEffect(() => {
    form.resetFields();
    setUpdatedName(name);
    setUpdatedBrand(brand);
    setUpdatedCat(category);
    setUpdatedModel(model);
    setUpdatedStock(stock);
    setUpdatedUnit(unit);
    // eslint-disable-next-line
  }, [id]);

  const submitHandler = () => {
    if (name && unit && category) {
      setTimeout(() => {
        setShowEditModal(false);
        setShowAlert(true);
        dispatch(getItems());
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }, 500);
      dispatch(
        updateItem({
          _id: id,
          name: updatedName,
          brand: updatedBrand,
          category: updatedCat,
          model: updatedModel,
          stock: updatedStock,
          unit: updatedUnit,
          valid: true,
        })
      );
    }
  };
  const cancelHandler = () => {
    setShowEditModal(false);
    form.resetFields();
  };
  const formDataHandler = ({ name1, cat1, brand1, model1, stock1, unit1 }) => {
    if (name1) setUpdatedName(name1);
    if (cat1) setUpdatedCat(cat1);
    if (brand1) setUpdatedBrand(brand1);
    if (model1) setUpdatedModel(model1);
    if (stock1) setUpdatedStock(stock1);
    if (unit1) setUpdatedUnit(unit1);
  };
  return (
    <Modal
      title="编辑物品"
      visible={showEditModal}
      okText="修改"
      cancelText="取消"
      onOk={submitHandler}
      confirmLoading={loading}
      onCancel={cancelHandler}
      forceRender
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
          name="name1"
          rules={[{ required: true, message: '请填写商品名称！' }]}
          initialValue={name}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="类别"
          name="cat1"
          rules={[{ required: true, message: '请选择商品类别！' }]}
          initialValue={category}
        >
          <Select>
            {categories.map((category, index) => (
              <Select.Option key={'cat' + index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="品牌" name="brand1" initialValue={brand}>
          <Input />
        </Form.Item>
        <Form.Item label="型号" name="model1" initialValue={model}>
          <Input />
        </Form.Item>
        <Form.Item label="库存" name="stock1" initialValue={stock}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="单位"
          name="unit1"
          rules={[{ required: true, message: '请选择计量单位！' }]}
          initialValue={unit}
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
  );
};
