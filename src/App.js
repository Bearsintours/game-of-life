import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Board />
        <Settings />
      </div>
    );
  }
}

const Header = () => {
  return (
    <div>
      <header className="App-header">
        <h1 className="App-title">Game of Life</h1>
      </header>
      <p className="App-intro">
        Instructions 
      </p>
    </div>
  );
};

class Board extends React.Component {
  state = {
    columns: 10,
    rows: 10,

  };
  render() {
    let board = [];
    const deadCell = 0;
    const aliveCell = 1;
    for (let row = 0; row < this.state.columns; row++) {
      for (let col = 0; col < this.state.rows; col++) {
        if (row % 2 === 0) board.push(aliveCell);
        else board.push(deadCell);
      }
    }
    return (
      <div>
        <p>{board}</p>
      </div>
    );
  };
};

class Settings extends React.Component {
  render() {
    return (
      <div>
        <p>Buttons here</p>
      </div>
    );
  };
};

export default App;
