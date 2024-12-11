type GameCircleProps = {
  id: number;
  className: string;
  onCircleClicked: (id: number) => void;
};

const GameCircle = ({ id, className, onCircleClicked }: GameCircleProps) => {
  return (
    <div
      id={id.toString()}
      className={`w-[100px] border-4 border-black h-[100px] rounded-full m-2.5 ${className}`}
      onClick={() => onCircleClicked(id)}
    ></div>
  );
};

export default GameCircle;
