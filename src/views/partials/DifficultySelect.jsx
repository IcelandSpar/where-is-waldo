import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../../styles/DifficultySelect.module.css";

const DifficultySelect = () => {
  const [ gameImages, setGameImages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ fetchErr, setFetchErr ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setFetchErr(false);
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/images`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        setGameImages(res);
      })
      .catch((err) => {
        console.error(err);
        if (err) {
          setFetchErr(true);
        };
      })
  }, []);

  const handleGameSelectBtn = (e, game) => {
    e.preventDefault();
    console.log(game);
    // starts game and redirects to game
    fetch(
      `${import.meta.env.VITE_FETCH_BASE_URL}/game/create-player/${
        game.image_id
      }`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        fetch(
          `${import.meta.env.VITE_FETCH_BASE_URL}/game/create-player-items/${
            game.image_id
          }/${res.player_id}`,
          {
            method: "POST",
          }
        )
          .then((res) => res.json())
          .then((res) => console.log(res));
        navigate(`/${game.image_id}/${res.player_id}/${game.difficulty}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2>Choose a Game</h2>
      {isLoading && !fetchErr ? <p>Loading Games...</p> : null}
      {fetchErr ? <p>Something went wrong</p> : null}
      {gameImages == null ? null : (
        <ul className={styles.gameListUl}>
          {gameImages.map((game, index) => {
            return (
              <li className={styles.gameListLi} key={game.image_id}>
                <button onClick={(e) => handleGameSelectBtn(e, game)}>
                  {game.image_name}
                </button>
                <p>Difficulty: {game.difficulty}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DifficultySelect;
