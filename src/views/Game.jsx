import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Image from './partials/Image.jsx';
import Timer from './partials/Timer.jsx';
import ItemList from './partials/ItemList.jsx';
import SubmitMsg from "./partials/SubmitMsg.jsx";
import SelectMenu from "./partials/SelectMenu.jsx";
import GameEndModal from "./partials/GameEndModal.jsx";


import styles from "../styles/Game.module.css";
import iSpy10 from "../assets/i_spy_10.jpg";

const Game = () => {
  const [ gameLoading, setGameLoading ] = useState(false);
  const [ isGameWon, setIsGameWon ] = useState(false);
  const [ imagePath, setImagePath ] = useState(null);
  const [ gameEndResults, setGameEndResults ] = useState(null);
  const [ waldoItems, setWaldoItems ] = useState();
  const [ completedWaldoItems, setCompletedWaldoItems ] = useState([]);
  const [ submitResultMsg, setSubmitResultMsg ] = useState(null);
  const [ targetOptions, setTargetOptions ] = useState({
    targetWidth: 50,
    targetDotSize: 10,
    targetDotColor: "red",
    reticleColor: "red",
    reticleWidth: 5,
    reticleStyle: "dashed",
    isMenuActive: false,
    menuWidth: 200,
    menuHeight: 200,
    menuFontSize: "1rem",
  });
  const { difficulty, imageId, playerId } = useParams();

   const capitalizeFirstLetter = (str) => {
    let capitalizedFirstLetter = str[0].toUpperCase();
    return capitalizedFirstLetter + str.slice(1);
  };

    const checkIfGameWon = (imageId, playerId) => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/check-if-all-items-found/${imageId}/${playerId}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setGameEndResults(res.endGameResults);
      setIsGameWon(res.allItemsFound)
    })
  }

  const checkIfGameWonReadOnly = (imageId ,playerId) => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/check-if-game-won-read-only/${imageId}/${playerId}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      setGameEndResults(res.endGameResults);
      setIsGameWon(res.allItemsFound)
    })
  }

  useEffect(() => {

  setGameLoading(true);


    setTimeout(() => {


    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/get-image-path/${imageId}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setImagePath(res[0].image_path);
      console.log(res)
    })
    .catch((err) => console.error(err));


    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/restart-game/${playerId}`, {
      method: 'PUT',
    })
    .catch((err) => console.error(err))

    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/get-player-items/${imageId}/${playerId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setWaldoItems(res);
        checkIfGameWonReadOnly(imageId, playerId)

      });
      setGameLoading(false)
    }, 5000)

    

  }, [imageId, playerId]);

  return (
    <div className={styles.overflowHiddenCont}>
      {isGameWon ? (<GameEndModal gameEndResults={gameEndResults}/>) : null}
      {gameLoading ? (
        <div>

        </div>
      ) : (
      <main className={styles.gameMainCont}>
        <Timer isGameWon={isGameWon}/>
        {submitResultMsg != null ? (
          <SubmitMsg setSubmitResultMsg={setSubmitResultMsg} submitResultMsg={submitResultMsg}/>
        ) : null}
        <Image capitalizeFirstLetter={capitalizeFirstLetter}  imagePath={imagePath} styles={styles} setIsGameWon={setIsGameWon} checkIfGameWon={checkIfGameWon} setWaldoItems={setWaldoItems} setTargetOptions={setTargetOptions}  targetOptions={targetOptions} waldoItems={waldoItems} setSubmitResultMsg={setSubmitResultMsg} completedWaldoItems={completedWaldoItems} setCompletedWaldoItems={setCompletedWaldoItems} setGameEndResults={setGameEndResults}/>
        <ItemList capitalizeFirstLetter={capitalizeFirstLetter} waldoItems={waldoItems}/>
      </main>
      )}

    </div>
  );
};

export default Game;
