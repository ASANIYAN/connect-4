export type FooterProps = {
  handleNewGame: () => void;
  handleSuggest: () => void;
};

const Footer: React.FC<FooterProps> = ({ handleNewGame, handleSuggest }) => {
  return (
    <div className="absolute bottom-0 bg-[#FAFAD2] border-4 border-[#deb887] shadow-lg z-10 grid grid-cols-2 gap-5 px-2.5 justify-center items-center h-20 w-[300px] left-1/2 -translate-x-[150px] translate-y-24">
      <button
        onMouseDown={handleNewGame}
        className="bg-blue-100 w-full border-4 border-[#7b3f00] text-xl shadow-lg font-medium"
      >
        {" "}
        New Game{" "}
      </button>
      <button
        onMouseDown={handleSuggest}
        className="bg-blue-100 w-full border-4 border-[#7b3f00] text-xl shadow-lg font-medium"
      >
        Suggest
      </button>
    </div>
  );
};

export default Footer;
