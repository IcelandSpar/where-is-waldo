import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import GameLeaderboard from "./GameLeaderboard.jsx";

import minimizeIcon from '../../assets/minimize_icon.svg';
import leaderboardIcon from '../../assets/leaderboard.svg';

const GamePreview = ({ styles, game, capitalizeFirstLetter }) => {
  const navigate = useNavigate();
  const [gameLeaderboard, setGameLeaderboard] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [fetchLeaderboardErr, setFetchLeaderboardErr] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  const fetchGameLeaderboard = (game) => {
    setIsLeaderboardOpen((prev) => !prev);
    setFetchLeaderboardErr(false);
    if (isLeaderboardOpen) {
      setIsLeaderboardLoading(true);
      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/game/get-game-leaderboard/${
          game.image_id
        }`
      )
        .then((res) => res.json())
        .then((res) => setGameLeaderboard(res))
        .catch((err) => {
          console.error(err);
          setFetchLeaderboardErr(true);
        })
        .finally(() => setIsLeaderboardLoading(false));
    }
  };

  const handleGameSelectBtn = (e, game) => {
    e.preventDefault();
    const targetClassName = e.target.className.split(" ")[1];
    if (
      targetClassName == "checkLeaderboardCont" ||
      targetClassName == "checkLeaderboardText" ||
      targetClassName == "openLeaderboardIcon" ||
      targetClassName == "leaderboardIcon"
    ) {
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
    <li
      onClick={(e) => handleGameSelectBtn(e, game)}
      className={styles.gameListLi}
      style={{
        backgroundImage: `url(${import.meta.env.VITE_FETCH_BASE_URL}/public/${
          game.image_path
        })`,
      }}
    >
      <div className={styles.backgroundDimmer}>
        <h3 className={styles.gameTitle}>{game.image_name}</h3>
        <p className={styles.gameDifficulty}>
          Difficulty: {capitalizeFirstLetter(game.difficulty)}
        </p>
        <button
          className={`${styles.checkLeaderboardCont} checkLeaderboardCont`}
        >
          <p className={`${styles.checkLeaderboardText} checkLeaderboardText`}>
            Check out the leaderboard!
          </p>
          <div className={`${styles.openLeaderboardIcon} openLeaderboardIcon`}>
            {!isLeaderboardOpen ? <img className={`${styles.leaderboardIcon} leaderboardIcon`} src={leaderboardIcon} alt="leaderboard" /> : <img className={`${styles.collapseLeaderboardIcon} leaderboardIcon`} src={minimizeIcon} alt="close leaderboard table"/>}
          </div>
        </button>
        {!isLeaderboardOpen || isLeaderboardLoading ? null : <GameLeaderboard leaderboardContent={gameLeaderboard}/>}
        {isLeaderboardLoading && isLeaderboardOpen ? <p>Loading Leaderboard...</p> : null}
        {!fetchLeaderboardErr ? null : <p>Something went wrong...</p>}
      </div>
    </li>
  );
};

export default GamePreview;
