import Board from "./Board";
import { useState } from "react";
import type { SquareValue } from "../types";

type Squares = SquareValue[];

export default function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const [history, setHistory] = useState<Squares[]>([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState<number>(0);
  const currentSquares = history[currentMove] || Array(9).fill(null);

  function handlePlay(nextSquares: Squares): void {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    setXIsNext(!xIsNext);
  }

  function jumpTo(moveIndex: number): void {
    setCurrentMove(moveIndex);
    setXIsNext(moveIndex % 2 === 0);
  }

  const moves = history.map((gameState: Squares, moveIndex: number) => {
    const description =
      moveIndex > 0 ? `Go to move #${moveIndex}` : "Go to game start";

    return (
      <li key={moveIndex}>
        <button onClick={() => jumpTo(moveIndex)}>{description}</button>
      </li>
    );
  });

  function resetGame(): void {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button onClick={resetGame} className="reset-button">
          🔄 New Game
        </button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
