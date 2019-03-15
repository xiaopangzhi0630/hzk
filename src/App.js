// 根组件, 展示其他组件

import React, { Component } from 'react';

import './App.css';

import RouterComponent from './router.js'

class App extends Component {
  render() {
    return (
      <div className="App">

        <RouterComponent />



      </div>
    );
  }
}

export default App;
