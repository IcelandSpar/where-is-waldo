import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "../../styles/DifficultySelect.module.css";
import GamePreview from "./GamePreview";

const DifficultySelect = ({ capitalizeFirstLetter }) => {
  const [gameImages, setGameImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState(false);

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

  return (
    <>
      <h2 className={styles.chooseGameHeading}>Choose a Game</h2>
      {isLoading && !fetchErr ? <p>Loading Games...</p> : null}
      {fetchErr ? <p>Something went wrong</p> : null}
      {gameImages == null ? null : (
        <ul className={styles.gameListUl}>
          {gameImages.map((game, index) => {
            return (
              <GamePreview
                key={game.image_id}
                styles={styles}
                game={game}
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default DifficultySelect;
