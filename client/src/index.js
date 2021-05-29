import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'antd/dis/antd.css';
// react와 redux를 연결해주기 위해 Provider
import { Provider } from 'react-redux';
// store가 function과 promise를 처리할수 있게 임포트해온다.
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// store는 객체밖에 처리 못해서 function과 promise를 처리하기 위해 redux-promise와 redux-thunk 모듈 설치
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDOM.render(
  <Provider
        store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}
    >
        <App />
    </Provider>
    , document.getElementById('root'));


reportWebVitals();

