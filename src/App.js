import React, { Component } from 'react';
import './App.css';


class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Game of Life</h1>
        <Game/>
      </div>
    );
  };
};


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(50).fill().map(() => Array(50).fill('dead')),
      cols: 50,
      rows: 50,
      generations: 0,
      playing: false
    }
  }
  
  componentDidMount() {
    this.createRandomBoard();
    this.interval = setInterval(this.updateCells, 1000); 
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  createRandomBoard = () => {
    let boardCopy = [...this.state.board];
    let randomState = () => Math.round(Math.random(10)) === 0 ? 'alive' : 'dead';
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        boardCopy[i][j] = randomState();
      }
    }
    this.setState((prevState) => ({ board: boardCopy, playing: !prevState.playing }))
  }
  
  updateCells = () => {
    if (this.state.playing) {
      let boardCopy = [...this.state.board];
      for (let i = 0; i < boardCopy.length; i++) {
        for (let j = 0; j < boardCopy[i].length; j++) {
          boardCopy[i][j] = boardCopy[i][j] === 'dead' ? 'alive' : 'dead';
        }
      }
      this.setState((prevState) => ({ 
        board: boardCopy, 
        generations: prevState.generations + 1 
      }));
    }   
  }
  
  clearBoard = () => {
    let boardCopy = [...this.state.board];
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        boardCopy[i][j] = 'dead';
      }
    }
    this.setState({ board: boardCopy, playing: !this.state.playing })  
  }
  
  handleClickCell = (i,j) => {
    let boardCopy = [...this.state.board];
    boardCopy[i][j] = boardCopy[i][j] === 'dead' ? 'alive' : 'dead';
    this.setState({ board: boardCopy })
  }

  
  render() {
    const columns = this.state.cols;
    const rows = this.state.rows;
    const gridWidth = rows * 16;
    let board = [];
    let rowsArray = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let id = i + ',' + j;
        let classCell = this.state.board[i][j] == 'dead' ? 'cell dead' : 'cell alive';
        rowsArray.push(
          <Cell 
            key={id}
            id={id}
            status={status}
            row={i}
            col={j}
            classCell={classCell}
            handleClickCell={this.handleClickCell}
          />
        );
      }
    }
    
    return (
      <div>
        <button onClick={this.createRandomBoard}>Start</button>
        <button onClick={this.clearBoard}>Clear</button>
        <div className="grid" style={{width: gridWidth}}>
          {rowsArray} 
        </div>
        <div>
          Generations: {this.state.generations}
        </div>
      </div>
    );
  }
}


class Cell extends React.Component { 
  handleClickCell = () => {
    return this.props.handleClickCell(this.props.row, this.props.col);
  }
  render() {
    
    return (
      <div 
        className={this.props.classCell} 
        id={this.props.id} 
        col={this.props.col}
        row={this.props.row}
        status={this.props.status}
        onClick={this.handleClickCell}
      >    
      </div>
    )
  }
}

export default App;
