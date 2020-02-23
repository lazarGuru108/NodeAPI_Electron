import React, { Component } from 'react';
import './App.css';
import './assets/styles/main.scss';
import AppNavigator from './AppNavigator';
import { combineReducers, applyMiddleware } from 'redux';
import userReducer from './store/reducers/userReducer';
import saleReducer from './store/reducers/saleReducer';
import createStore from 'antd/lib/table/createStore';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const mainReducer = combineReducers({
  users: userReducer, 
  sales: saleReducer
});

const store = createStore(mainReducer, applyMiddleware(thunk));

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
export default App;
