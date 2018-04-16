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
      board: Array(25).fill().map(() => Array(25).fill('dead')),
      cols: 25,
      rows: 25,
      generations: 0,
      playing: false
    }
  }
  
  componentDidMount() {
    this.createRandomBoard();
    this.interval = setInterval(this.updateCells, 100); 
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  createRandomBoard = () => {
    let boardCopy = this.state.board;
    let randomState = () => Math.round(Math.random(5)) === 1 ? 'alive' : 'dead';
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        boardCopy[i][j] = randomState();
      }
    }
    this.setState((prevState) => ({ board: boardCopy, playing: !prevState.playing }))
  }
  
  updateCells = () => {
    if (this.state.playing) {
      let board = this.state.board;
      let rows = this.state.rows;
      let cols = this.state.cols;
      // We create a deep copy of this.state.board so we can update cell without mututing current state
      let newBoard = JSON.parse(JSON.stringify(this.state.board));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          console.log('row ' + r + ' col '+ c);
          let count = 0;
          if (r + 1 < rows && board[r + 1][c] === 'alive') { console.log('bottom'); count++; }
          if (r - 1 >= 0 && board[r - 1][c] === 'alive') {
            console.log('top');
            count++;
          }
          if (c + 1 < cols && board[r][c + 1] === 'alive') {
            console.log('right');
            count++;
          }
          if (c - 1 >= 0 && board[r][c - 1] === 'alive') {
            console.log('left');
            count++;
          }
          if (r - 1 >= 0 && c - 1 >= 0 && board[r - 1][c - 1] === 'alive') {
            console.log('top-left');
            count++;
          }
          if (r - 1 >= 0 && c + 1 < cols && board[r - 1][c + 1] === 'alive') {
            console.log('top-right');
            count++;
          }
          if (r + 1 < rows && c - 1 >= 0 && board[r + 1][c - 1] === 'alive') {
            console.log('bottom-left');
            count++;
          }
          if (r + 1 < rows && c + 1 < cols && board[r + 1][c + 1] === 'alive') {
            console.log('bottom-right');
            count++;
          }

          if (board[r][c] === 'alive') {
            if (count < 2 || count > 3) {
              newBoard[r][c] = 'dead';
            }
          }
          else if (board[r][c] === 'dead') {
            if (count === 3) {
              newBoard[r][c] = 'alive';
            }
          }
        }
      }
      this.setState((prevState) => ({ 
        board: newBoard, 
        generations: prevState.generations + 1 
      }));
    }   
  }
  
  clearBoard = () => {
    clearInterval(this.interval);
    let boardCopy = this.state.board;
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        boardCopy[i][j] = 'dead';
      }
    }
    this.setState((prevState) => ({ board: boardCopy, generations: 0, playing: prevState.playing ? !prevState.playing : prevState.playing })) 
  }
  
  pauseGame = () => {
    if (this.state.playing) {
      clearInterval(this.interval);
      this.setState((prevState) => ({
        playing: !prevState.playing
      }))
    } 
  }
  
  runGame = () => {
    if (!this.state.playing) {
      this.setState((prevState) => ({ playing: !prevState.playing }))
      this.interval = setInterval(this.updateCells, 100);
    }
  }
  
  handleClickCell = (r,c) => {
    let boardCopy = this.state.board;
    boardCopy[r][c] = boardCopy[r][c] === 'dead' ? 'alive' : 'dead';
    this.setState({ board: boardCopy })
  }

  
  render() {
    const columns = this.state.cols;
    const rows = this.state.rows;
    const gridWidth = rows * 16;
    let rowsArray = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let id = i + ',' + j;
        let classCell = this.state.board[i][j] === 'dead' ? 'cell dead' : 'cell alive';
        rowsArray.push(
          <Cell 
            key={id}
            id={id}
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
        <button onClick={this.runGame}>Run</button>
        <button onClick={this.pauseGame}>Pause</button>
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
        onClick={this.handleClickCell}
      >    
      </div>
    )
  }
}

export default App;
