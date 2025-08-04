import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDistanceStrict } from 'date-fns';

import PlayerNameForm from './PlayerNameForm';
import ConfettiExplosion from "react-confetti-explosion";

import styles from '../../styles/GameEndModal.module.css';
import GameLeaderboard from './GameLeaderboard';
import OpenLeaderboardBtn from './OpenLeaderboardBtn';

const GameEndModal = ({gameEndResults}) => {
  const [ isLeaderboardOpen, setIsLeaderboardOpen ] = useState(false);
  const [ isPlayerTopTen, setIsPlayerTopTen ] = useState(false);
  const [ isExploding, setIsExploding ] = useState(false);

  const { imageId, playerId } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/check-if-top-ten/${imageId}/${playerId}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setIsExploding(res.madeTopTen)
      setIsPlayerTopTen(res);
    })
    .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.gameEndModalBackground}>
     {isExploding &&  (
      <div className={styles.confettiExplosionCont}>
      <ConfettiExplosion zIndex={100} duration={5000} width={4000} onComplete={() => setIsExploding(false)}/>
      </div>)}
      <div className={styles.gameEndModalCont}>
        <h3 className={styles.resultsHeading}>Results</h3>
        <p className={styles.resultsPara}>You took: {formatDistanceStrict(gameEndResults[0].start_time, gameEndResults[0].end_time, {includeSeconds: true, addSuffix: false})}</p>
        {!isPlayerTopTen.madeTopTen ? null : <div className={styles.topTenCont}>
        <p>You made it to top 10!</p>
        <p>Your Rank is {isPlayerTopTen.rank}</p>
        </div>}
        <PlayerNameForm/>
        <div onClick={() => setIsLeaderboardOpen((prev) => !prev)}>
        <OpenLeaderboardBtn isLeaderboardOpen={isLeaderboardOpen}/>
        </div>
          {!isLeaderboardOpen ? null : (
            <div className={styles.gameLeaderboardCont}>
            <GameLeaderboard image_id={imageId} isLeaderboardOpen={isLeaderboardOpen} setIsLeaderboardOpen={setIsLeaderboardOpen}/>
            </div>
            )}
        <Link to='/' className={styles.tryNewGameLink}>Try a new game</Link>
      </div>
    </div>
  )
};

export default GameEndModal;