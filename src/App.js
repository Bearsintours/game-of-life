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
      board: Array(5).fill().map(() => Array(5).fill('dead')),
      cols: 5,
      rows: 5,
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
    console.log("before create state: ", this.state.board)
    let boardCopy = [...this.state.board];
    let randomState = () => Math.round(Math.random(10)) === 0 ? 'alive' : 'dead';
    for (let i = 0; i < boardCopy.length; i++) {
      for (let j = 0; j < boardCopy[i].length; j++) {
        boardCopy[i][j] = randomState();
      }
    }
    this.setState((prevState) => ({ board: boardCopy, playing: !prevState.playing }))
    console.log("after create state: ", this.state.board)
  }
  
  updateCells = () => {
    if (this.state.playing) {
      let newBoard = this.state.board;
      let boardCopy = [...this.state.board];
      console.log('state before: ',this.state.board);
      console.log('copy: ', newBoard)
      console.log('copy with [...] : ', boardCopy)
      //let boardCopy = [...this.state.board];
      let rows = this.state.rows;
      let cols = this.state.cols;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          //let cell = this.state.board[r][c];
          console.log('row ' + r + ' col '+ c);
          let count = 0;
          if (r + 1 < rows && this.state.board[r + 1][c] === 'alive') { console.log('bottom'); count++; }
          if (r - 1 >= 0 && this.state.board[r - 1][c] === 'alive') {
            console.log('top');
            count++;
          }
          if (c + 1 < cols && this.state.board[r][c + 1] === 'alive') {
            console.log('right');
            count++;
          }
          if (c - 1 >= 0 && this.state.board[r][c - 1] === 'alive') {
            console.log('left');
            count++;
          }
          if (r - 1 >= 0 && c - 1 >= 0 && this.state.board[r - 1][c - 1] === 'alive') {
            console.log('top-left');
            count++;
          }
          if (r - 1 >= 0 && c + 1 < cols && this.state.board[r - 1][c + 1] === 'alive') {
            console.log('top-right');
            count++;
          }
          if (r + 1 < rows && c - 1 >= 0 && this.state.board[r + 1][c - 1] === 'alive') {
            console.log('bottom-left');
            count++;
          }
          if (r + 1 < rows && c + 1 < cols && this.state.board[r + 1][c + 1] === 'alive') {
            console.log('bottom-right');
            count++;
          }

          if (this.state.board[r][c] === 'alive') {
            if (count < 2 || count > 3) {
              newBoard[r][c] = 'dead';
            }
          }
          else if (this.state.board[r][c] === 'dead') {
            if (count === 3) {
              newBoard[r][c] = 'alive';
            }
          }
        }
        console.log('Copy after: ', newBoard)
      }
      this.setState((prevState) => ({ 
        board: newBoard, 
        generations: prevState.generations + 1 
      }));
    }   
    
    console.log('State after: ', this.state.board)
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
    clearInterval(this.interval);
    this.setState((prevState) => ({ playing: !prevState.playing }))
  }
  
  runGame = () => {
    if (!this.state.playing) {
      this.setState((prevState) => ({ playing: !prevState.playing }))
      this.interval = setInterval(this.updateCells, 1000);
    }
  }
  
  handleClickCell = (i,j) => {
    console.log('State before click: ' + this.state.board)
    let boardCopy = this.state.board;
    boardCopy[i][j] = this.state.board[i][j] === 'dead' ? 'alive' : 'dead';
    this.setState({ board: boardCopy })
    console.log('state after click: ' + this.state.board);
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
