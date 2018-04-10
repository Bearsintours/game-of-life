import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Game of Life</h1>
                <Game />
                <Settings />
            </div>
        );
    };
};


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(10).fill().map(() => Array(10).fill(null)),
            cols: 10,
            rows: 10,
        }
    }

    render() {
        const columns = this.state.cols;
        const rows = this.state.rows;
        let board = [];
        let rowsArray = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let id = i + ',' + j;
                board.push({ id: id, status: 'dead' });
                rowsArray.push(
                    <Cell
                        key={id}
                        id={id}
                    />
                );
            }
        }

        return (
            <div className="grid">
                {rowsArray}
            </div>
        );
    }
}


function Cell(props) {
    return (
        <div className="square" id={props.id}>
        </div>
    )
}


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
