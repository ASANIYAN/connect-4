import {
  GAME_STATE_DRAW,
  GAME_STATE_PLAYING,
  GAME_STATE_WIN,
} from "../constants";

const Header = ({
  currentPlayer,
  gameState,
  winPlayer,
}: {
  currentPlayer: number;
  gameState: number;
  winPlayer: number;
}) => {
  const renderLabel = () => {
    switch (gameState) {
      case GAME_STATE_PLAYING:
        return `Player ${currentPlayer} Turn`;
      case GAME_STATE_WIN:
        return `Player ${winPlayer} Wins`;
      case GAME_STATE_DRAW:
        return `Game is a Draw!`;
      default:
        break;
    }
  };
  return (
    <div className="absolute bg-[#FAFAD2] border-4 border-[#deb887] shadow-lg z-10 flex justify-center items-center h-20 w-[300px] left-1/2 -translate-x-[150px] -translate-y-14">
      <span className="text-center text-3xl font-medium">{renderLabel()}</span>
    </div>
  );
};

export default Header;
