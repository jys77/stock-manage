import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Form, Input, Select, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addItem } from "../actions";

export const Manage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.newAdd);
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

  // useEffect(() => {
  //   if ((data && data.msg) || error) {
  //     setShowAlert(true);
  //     setName(null);
  //     setCat(null);
  //     setBrand(null);
  //     setModel(null);
  //     setUnit(null);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 5000);
  //   }
  // }, [data, error]);

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

  return (
    <div className="content-manage">
      <Button
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
          message={data ? data.msg : error ? error.msg : null}
          type={data ? "success" : "error"}
          style={{
            marginTop: "1rem",
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
        confirmLoading={loading}
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
            rules={[{ required: true, message: "请填写商品名称！" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="类别"
            name="cat"
            rules={[{ required: true, message: "请选择商品类别！" }]}
          >
            <Select>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
              <Select.Option value="E">E</Select.Option>
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
            rules={[{ required: true, message: "请选择计量单位！" }]}
          >
            <Select>
              <Select.Option value="ge">个</Select.Option>
              <Select.Option value="zhi">只</Select.Option>
              <Select.Option value="mi">米</Select.Option>
              <Select.Option value="juan">卷</Select.Option>
              <Select.Option value="xiang">箱</Select.Option>
              <Select.Option value="pingfang">平方</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
