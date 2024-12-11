export const isWinner = (
  gameBoard: number[],
  currentMove: number,
  currentPlayer: number
) => {
  const board = [...gameBoard];
  board[currentMove] = currentPlayer;

  const winningCombinations = [
    // Horizontal wins
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // Vertical wins
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // Diagonal wins
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [p1, p2, p3, p4] = winningCombinations[i];

    if (
      board[p1] > 0 &&
      board[p1] === board[p2] &&
      board[p2] === board[p3] &&
      board[p3] === board[p4]
    ) {
      return true;
    }
  }
  return false;
};

export const isDraw = (
  gameBoard: number[],
  currentMove: number,
  currentPlayer: number
) => {
  const board = [...gameBoard];
  board[currentMove] = currentPlayer;

  const count = board.reduce(
    (accumulator, currentValue) => accumulator + (currentValue === 0 ? 1 : 0),
    0
  );

  console.log(`count: ${count}`);
  return count === 0;
};

export const getRandomComputerMove = (gameBoard: number[]) => {
  const validMoves = [];
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === 0) {
      validMoves.push(i);
    }
  }
  const randMove = Math.floor(Math.random() * validMoves.length);
  return validMoves[randMove];
};

const getPosition = (
  gameBoard: number[],
  moveChecks: {
    indexes: number[];
    max: number;
    step: number;
  }[]
) => {
  for (let check = 0; check < moveChecks.length; check++) {
    for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
      const series =
        gameBoard[i + moveChecks[check].indexes[0]].toString() +
        gameBoard[i + moveChecks[check].indexes[1]].toString() +
        gameBoard[i + moveChecks[check].indexes[2]].toString() +
        gameBoard[i + moveChecks[check].indexes[3]].toString();

      switch (series) {
        case "1110":
        case "2220":
          return i + moveChecks[check].indexes[3];
        case "1101":
        case "2202":
          return i + moveChecks[check].indexes[2];
        case "1011":
        case "2022":
          return i + moveChecks[check].indexes[1];
        case "0111":
        case "0222":
          return i + moveChecks[check].indexes[0];

        default:
      }
    }
  }
  return -1;
};

export const getComputerMove = (gameBoard: number[]) => {
  const moveChecks = [
    //  vertical
    {
      indexes: [0, 4, 8, 12],
      max: 4,
      step: 1,
    },
    //  horizontal
    {
      indexes: [0, 1, 2, 3],
      max: 16,
      step: 4,
    },

    //diagonal TL - BR
    {
      indexes: [0, 5, 10, 15],
      max: 16,
      step: 16,
    },

    // diagonal TR - BL
    {
      indexes: [3, 6, 9, 12],
      max: 16,
      step: 16,
    },
  ];

  const position = getPosition(gameBoard, moveChecks);

  if (position > -1) return position;

  return getRandomComputerMove(gameBoard);
};
