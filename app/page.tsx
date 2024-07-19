import React from 'react';
import Game from '../components/Game/Game';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Game />
    </div>
  );
};

export default Home;