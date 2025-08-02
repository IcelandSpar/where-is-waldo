import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboards from "./Leaderboards";
import GameLeaderboard from "./GameLeaderboard.jsx";

import minimizeIcon from "../../assets/minimize_icon.svg";
import leaderboardIcon from "../../assets/leaderboard.svg";

const GamePreview = ({ styles, game, capitalizeFirstLetter }) => {
  const navigate = useNavigate();
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);



  const handleGameSelectBtn = (e, game) => {
    e.preventDefault();
    const targetClassName = e.target.className.split(" ")[1];
    if (
      targetClassName == "checkLeaderboardCont" ||
      targetClassName == "checkLeaderboardText" ||
      targetClassName == "openLeaderboardIcon" ||
      targetClassName == "leaderboardIcon"
    ) {
      setIsLeaderboardOpen((prev) => !prev);
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
            {!isLeaderboardOpen ? (
              <img
                className={`${styles.leaderboardIcon} leaderboardIcon`}
                src={leaderboardIcon}
                alt="leaderboard"
              />
            ) : (
              <img
                className={`${styles.collapseLeaderboardIcon} leaderboardIcon`}
                src={minimizeIcon}
                alt="close leaderboard table"
              />
            )}
          </div>
        </button>
        {!isLeaderboardOpen? null : (
          <GameLeaderboard image_id={game.image_id} setIsLeaderboardOpen={setIsLeaderboardOpen} isLeaderboardOpen={isLeaderboardOpen}/>
        )}

      </div>
    </li>
  );
};

export default GamePreview;
