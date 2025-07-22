import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from '../../styles/DifficultySelect.module.css';

const DifficultySelect = () => {
  const [ gameImages, setGameImages ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/images`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setGameImages(res);
    })
  }, []);

  const handleGameSelectBtn = (e, game) => {
    e.preventDefault();
    console.log(game);
    // starts game and redirects to game
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/create-player/${game.image_id}`, {
      method: 'POST',
    })
    .then((res) => res.json())
    .then((res) => {
          fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/create-player-items/${game.image_id}/${res.player_id}`, {
            method: 'POST'
          })
          .then((res) => res.json())
          .then((res) => console.log(res))
          navigate(`/${game.image_id}/${res.player_id}/${game.difficulty}`);
    })
    .catch((err) => {
      console.error(err);
    });
   




  }

  return (
    <>
    <h2>Choose an image</h2>
    <ul className={styles.gameListUl}>
    {gameImages == null ? null : (
      gameImages.map((game, index) => {
        return (
          <li className={styles.gameListLi} key={game.image_id}>
            <button onClick={(e) => handleGameSelectBtn(e, game)}>{game.image_name}</button>
            <p>Difficulty: {game.difficulty}</p>
          </li>
        )
      })
    )}
    </ul>
    </>
  )
};

export default DifficultySelect;