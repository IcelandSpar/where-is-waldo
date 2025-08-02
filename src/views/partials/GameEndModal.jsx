import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { formatDistanceStrict } from 'date-fns';

import PlayerNameForm from './PlayerNameForm';

import styles from '../../styles/GameEndModal.module.css';
import GameLeaderboard from './GameLeaderboard';
import OpenLeaderboardBtn from './OpenLeaderboardBtn';

const GameEndModal = ({gameEndResults}) => {
  const [ isLeaderboardOpen, setIsLeaderboardOpen ] = useState(true);

  const { imageId } = useParams();

  return (
    <div className={styles.gameEndModalBackground}>
      <div className={styles.gameEndModalCont}>
        <h3 className={styles.resultsHeading}>Results</h3>
        <p className={styles.resultsPara}>You took: {formatDistanceStrict(gameEndResults[0].start_time, gameEndResults[0].end_time, {includeSeconds: true, addSuffix: false})}</p>
        <PlayerNameForm/>
        <div onClick={() => setIsLeaderboardOpen((prev) => !prev)}>
        <OpenLeaderboardBtn isLeaderboardOpen={isLeaderboardOpen}/>
        </div>
          {!isLeaderboardOpen ? null : <GameLeaderboard image_id={imageId} isLeaderboardOpen={isLeaderboardOpen} setIsLeaderboardOpen={setIsLeaderboardOpen}/>}
        <Link to='/' className={styles.tryNewGameLink}>Try a new game</Link>
      </div>
    </div>
  )
};

export default GameEndModal;