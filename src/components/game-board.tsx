import { useEffect, useState } from "react";
import GameCircle from "./game-circle";
import Header from "./header";
import Footer from "./footer";
import { getComputerMove, isDraw, isWinner } from "../helper";
import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
  NO_CIRCLES,
  NO_PLAYER,
  PLAYER_1,
  PLAYER_2,
} from "../constants";

const GameBoard = () => {
  const [board, setBoard] = useState(Array(16).fill(NO_PLAYER));
  const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
  const [currentPlayer, setCurrentPlayer] = useState<number>(PLAYER_1);
  const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

  const circleClicked = (id: number) => {
    if (board[id] !== NO_PLAYER) return;
    if (gameState !== GAME_STATE_PLAYING) return;

    if (isWinner(board, id, currentPlayer)) {
      setGameState(GAME_STATE_WIN);
      setWinPlayer(currentPlayer);
    }
    if (isDraw(board, id, currentPlayer)) {
      setGameState(GAME_STATE_DRAW);
      setWinPlayer(NO_PLAYER);
    }

    setBoard((prev) => {
      return prev.map((circle, pos) => {
        if (pos === id) return currentPlayer;
        return circle;
      });
    });

    setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
  };

  const renderCircle = (id: number) => {
    return (
      <GameCircle
        key={id}
        id={id}
        className={`player_${board[id]}`}
        onCircleClicked={circleClicked}
      />
    );
  };

  const initializeBoard = () => {
    const circles = [];
    for (let i = 0; i < NO_CIRCLES; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const suggestMove = () => {
    circleClicked(getComputerMove(board));
  };

  const initializeGame = () => {
    console.log("INIT GAME");

    setCurrentPlayer(PLAYER_1);
    setGameState(GAME_STATE_PLAYING);
    setBoard(Array(16).fill(NO_PLAYER));
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="relative">
      <Header
        gameState={gameState}
        currentPlayer={currentPlayer}
        winPlayer={winPlayer}
      />
      <div className="grid grid-cols-4 grid-rows-4 p-5 w-full max-w-[500px] mx-auto bg-[#F2D2BD] border-4 border-[#deb887] rounded-[8%] shadow-lg">
        {initializeBoard()}
      </div>
      <Footer handleNewGame={initializeGame} handleSuggest={suggestMove} />
    </div>
  );
};

export default GameBoard;
