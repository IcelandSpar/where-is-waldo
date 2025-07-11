import LeaderBoards from './partials/Leaderboards.jsx';
import DifficultySelect from './partials/DifficultySelect.jsx';

import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <>
    <h1>Where's Waldo?</h1>
    <p>Where is he?</p>
    <p>Find him, before he finds you</p>
    <DifficultySelect/>
    <LeaderBoards/>
    </>
  )
};

export default Home;