import { useParams } from 'react-router-dom';

import styles from '../styles/Game.module.css';

const Game = () => {
  const { difficulty } = useParams();
  console.log(difficulty)
  return (
    <>
    <p>Playing Game</p>
    </>
  )
};

export default Game;