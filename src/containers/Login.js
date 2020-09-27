import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions';
import { Layout, Form, Input, Button, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const Login = (props) => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.login);
  const [showAlert, setShowAlert] = useState(false);
  const onFinish = (values) => {
    const { username, password } = values;
    dispatch(login(username, password));
  };

  const onFinishFailed = (errorInfo) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  useEffect(() => {
    if (user) {
      setShowAlert(true);
      setTimeout(() => {
        props.history.push('/dashboard');
      }, 500);
    } else if (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
    return () => {
      setShowAlert(false);
    };
    // eslint-disable-next-line
  }, [user, error]);

  return (
    <>
      <Header className="login-title">库存进出管理系统</Header>
      <Content>
        {showAlert && (
          <Alert
            message={user ? '登录成功！' : error ? error.msg : '出错了'}
            type={user ? 'success' : 'error'}
            showIcon
            closable
          />
        )}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            {loading && <LoadingOutlined style={{ color: '#1890FF', marginLeft: '1rem' }} />}
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};
