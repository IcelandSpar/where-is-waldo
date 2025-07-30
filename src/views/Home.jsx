import LeaderBoards from "./partials/Leaderboards.jsx";
import DifficultySelect from "./partials/DifficultySelect.jsx";

import styles from "../styles/Home.module.css";

const Home = () => {
  const capitalizeFirstLetter = (str) => {
    let capitalizedFirstLetter = str[0].toUpperCase();
    return capitalizedFirstLetter + str.slice(1);
  };

  return (
    <div className={styles.homePage}>
    <div className={styles.homePageCont}>
      <h1 className={styles.homeHeading}>Where's Waldo?</h1>
      <div className={styles.homeParaCont}>
        <p>Where is he?</p>
        <p>Find him, before he finds you...</p>
      </div>
      <DifficultySelect capitalizeFirstLetter={capitalizeFirstLetter}/>
      <LeaderBoards capitalizeFirstLetter={capitalizeFirstLetter}/>
    </div>
    </div>
  );
};

export default Home;
