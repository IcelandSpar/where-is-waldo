import { formatDistanceStrict } from 'date-fns';
import { Link } from 'react-router-dom';

import styles from '../../styles/GameEndModal.module.css';

const GameEndModal = ({gameEndResults}) => {
  return (
    <div className={styles.gameEndModalBackground}>
      <div className={styles.gameEndModalCont}>
        <h3>Results:</h3>
        <p>You took: {formatDistanceStrict(gameEndResults[0].start_time, gameEndResults[0].end_time, {includeSeconds: true, addSuffix: false})}</p>
        <Link to='/'>Try a new game</Link>
      </div>
    </div>
  )
};

export default GameEndModal;