import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import './index.css';
import App from './App';
import { Store } from './Store';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <Provider store={Store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
