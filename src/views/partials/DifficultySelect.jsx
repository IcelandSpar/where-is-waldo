import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../../styles/DifficultySelect.module.css";

const DifficultySelect = ({capitalizeFirstLetter}) => {
  const [gameImages, setGameImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);
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
        }
      });
  }, []);

  const fetchGameLeaderboard = (game) => {
    console.log(game)
  }

  const handleGameSelectBtn = (e, game) => {
    e.preventDefault();
    const targetClassName = e.target.className.split(' ')[1];
    if(targetClassName == 'checkLeaderboardCont' 
      || targetClassName == 'checkLeaderboardText' 
      || targetClassName == 'openLeaderboardIcon') {
        fetchGameLeaderboard(game);
    } else {

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
    }



  };



  return (
    <>
      <h2 className={styles.chooseGameHeading}>Choose a Game</h2>
      {isLoading && !fetchErr ? <p>Loading Games...</p> : null}
      {fetchErr ? <p>Something went wrong</p> : null}
      {gameImages == null ? null : (
        <ul className={styles.gameListUl}>
          {gameImages.map((game, index) => {
            return (
              <li
                onClick={(e) => handleGameSelectBtn(e, game)}
                className={styles.gameListLi}
                key={game.image_id}
                style={{
                  backgroundImage: `url(${
                    import.meta.env.VITE_FETCH_BASE_URL
                  }/public/${game.image_path})`,
                }}
              >
                <div className={styles.backgroundDimmer}>
                  <h3 className={styles.gameTitle}>{game.image_name}</h3>
                  <p className={styles.gameDifficulty}>Difficulty: {capitalizeFirstLetter(game.difficulty)}</p>
                  <button className={`${styles.checkLeaderboardCont} checkLeaderboardCont`}>
                    <p className={`${styles.checkLeaderboardText} checkLeaderboardText`}>Check out the leaderboard!</p>
                    <div className={`${styles.openLeaderboardIcon} openLeaderboardIcon`}>\/</div>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DifficultySelect;
