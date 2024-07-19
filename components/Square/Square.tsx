import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-16 h-16 border border-gray-400 hover:bg-sky-500 flex items-center justify-center text-2xl"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;