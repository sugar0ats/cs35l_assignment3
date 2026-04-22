import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({value, onSquareClick}) {
  // const [value, setValue] = React.useState(null);
  // function handleClick() {
  //   setValue('X');
  // }
  return <button className='square' onClick={onSquareClick}>{value}</button>
}

export default function App() {

  const [squares, setSquares] = React.useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = React.useState(true);

  const [numTurns, setNumTurns] = React.useState(0);

  const [canSelectPieces, setCanSelectPieces]= React.useState(false);

  const [pieceSelected, setPieceSelected] = React.useState(null);

  function handleClick(i) {
    if (numTurns == 5) {
      setCanSelectPieces(true);
      console.log("select mode activated");
    }
    // if (squares[i] || calculateWinner(squares)) {
    //   return;
    // }

    // can only select x 
    

    const nextSquares = squares.slice();
    if (!canSelectPieces) {
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setNumTurns(numTurns + 1);
      setXIsNext(!xIsNext);
    } else {
      console.log("this is select mode.");
      console.log(squares);
      if (!pieceSelected && (squares[i] === (xIsNext ? "O" : "X"))) {
        console.log("successfully selected a piece");
        setPieceSelected(i);
      } else if (pieceSelected && (!squares[i]) && isValidMove(i, pieceSelected)) {
        nextSquares[i] = (xIsNext ? "O" : "X");
        nextSquares[pieceSelected] = null;
        setPieceSelected(null);
        setNumTurns(numTurns + 1);
        setXIsNext(!xIsNext);
      }
    }

    setSquares(nextSquares);
    

    
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className = 'status'> {numTurns}</div>
      <div className = 'status'> piece selected: {pieceSelected ? pieceSelected : -1}</div>
      <div className = 'status'> {} </div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>

      <Button onClick={resetGame}>Reset</Button>
    </>
    // <div className="container py-4">
    //   <Card className="starter-card shadow-sm">
    //     <Card.Body className="p-4">
    //       <h1 className="greeting display-6 fw-bold">Hello, {name}!</h1>
    //       <p className="mb-3 text-secondary">
    //         This starter is set up to match the React Essentials notes more closely.
    //         For the assignment, build the tic-tac-toe tutorial in this file and leave
    //         mounting to <code>src/main.jsx</code>.
    //       </p>
    //       <div className="d-flex gap-2 flex-wrap align-items-center">
    //         <Button variant="primary" onClick={() => setName('CS 35L')}>
    //           Set example name
    //         </Button>
    //         <Badge bg="secondary" pill>
    //           ReactBootstrap ready
    //         </Badge>
    //       </div>
    //     </Card.Body>
    //   </Card>
    // </div>
  )
}

// 0 1 2
// 3 4 5 
// 6 7 8

function isValidMove(i, pieceSelected) {
  let valid_pos = [[1, 3, 4], [0, 2, 3, 4, 5], [1, 4, 5], [0, 1, 4, 6, 7], [0, 1, 2, 3, 5, 6, 7, 8], [1, 2, 4, 7, 8], [3, 4, 7], [6, 3, 4, 5, 8], [5, 4, 7]];

  return i in valid_pos[pieceSelected];
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null;
}