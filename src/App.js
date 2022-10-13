import * as React from "react";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        highlightedLines: lines[i],
        winner: squares[a],
      };
    }
  }

  return {
    highlightedLines: null,
    winner: null,
  };
}

function Square(props) {
  return (
    <button
      className={`square ${props.highlighted ? "highlighted" : "null"}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, highlighted) {
    return (
      <Square
        value={this.props.squares[i]}
        highlighted={highlighted}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, this.props.highlightedLines.includes(0))}
          {this.renderSquare(1, this.props.highlightedLines.includes(1))}
          {this.renderSquare(2, this.props.highlightedLines.includes(2))}
        </div>
        <div className="board-row">
          {this.renderSquare(3, this.props.highlightedLines.includes(3))}
          {this.renderSquare(4, this.props.highlightedLines.includes(4))}
          {this.renderSquare(5, this.props.highlightedLines.includes(5))}
        </div>
        <div className="board-row">
          {this.renderSquare(6, this.props.highlightedLines.includes(6))}
          {this.renderSquare(7, this.props.highlightedLines.includes(7))}
          {this.renderSquare(8, this.props.highlightedLines.includes(8))}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  checkAllFilled(sqaures) {
    return sqaures.every((square) => square !== null);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (
      this.checkAllFilled(squares) ||
      calculateWinner(squares).winner ||
      squares[i]
    ) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button
            style={{
              fontWeight: move === this.state.stepNumber ? "bold" : "normal",
              transition: "font-weight ease-in-out 150ms",
            }}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (result.winner) {
      status = "Winner: " + result.winner;
    } else if (this.checkAllFilled(current.squares)) {
      status = "You've run out of moves. Draw!!!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            highlightedLines={result.highlightedLines || []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
