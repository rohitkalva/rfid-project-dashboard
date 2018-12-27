import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Components from './components';
// import ReactUploadImage from './upload'


class App extends Component {
  render() {
    return (
      // <ReactUploadImage/>
      <BrowserRouter>
      <Components />
      </BrowserRouter>    
      );
  }
}

export default App;
