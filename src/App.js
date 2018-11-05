import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Components from './components';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Components />
      </BrowserRouter>    );
  }
}

export default App;
