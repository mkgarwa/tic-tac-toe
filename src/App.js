import { useState } from "react";
import "./App.css";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [prevClick, setPrevClick] = useState(null);

  const Box = ({ value, clickHandler }) => {
    return (
      <div className="box" onClick={clickHandler}>
        {value}
      </div>
    );
  };
  const handleBoxClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquare = squares.slice();
    if (prevClick === null || prevClick === "O") {
      nextSquare[i] = "X";
      setPrevClick("X");
    } else {
      setPrevClick("O");
      nextSquare[i] = "O";
    }
    setSquares(nextSquare);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setPrevClick(null);
  };
  const winner = calculateWinner(squares);

  return (
    <div className="App">
      <header className="header">
        <h3>Tic Tac Toe</h3>
      </header>
      <div className="wining-box">
        {winner && (
          <>
            <h1>Winner is {winner}</h1>
            <button onClick={resetGame}>RESET</button>
          </>
        )}
      </div>
      <div className="wrapper">
        {squares &&
          squares.map((item, index) => (
            <Box
              key={index}
              value={squares[index]}
              clickHandler={() => handleBoxClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < combination.length; i++) {
    const [a, b, c] = combination[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
