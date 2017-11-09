import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Album Search</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TableComponent />
      </div>
    );
  }
}

class TableComponent extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              hello
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}


export default App;
