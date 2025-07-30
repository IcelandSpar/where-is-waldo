import LeaderBoards from './partials/Leaderboards.jsx';
import DifficultySelect from './partials/DifficultySelect.jsx';

import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePageCont}>
    <h1 className={styles.homeHeading}>Where's Waldo?</h1>
    <div className={styles.homeParaCont}>
      <p>Where is he?</p>
      <p>Find him, before he finds you...</p>
    </div>
    <DifficultySelect/>
    <LeaderBoards/>
    </div>
  )
};

export default Home;