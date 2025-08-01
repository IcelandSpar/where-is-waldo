import { useState, useEffect } from "react";
import { format } from "date-fns";

import fireworksAnimation from '../../assets/fireworks.gif';

import styles from "../../styles/Leaderboards.module.css";

const Leaderboards = ({capitalizeFirstLetter}) => {
  const [ leaderboard, setLeaderboard ] = useState(null);
  const [ leaderboardLimit, setLeaderboardLimit ] = useState(10);
  const [ loadingLeaderboard, setLoadingLeaderboard ] = useState(false);
  const [ fetchLeaderboardErr, setFetchLeaderboardErr ] = useState(false);

  useEffect(() => {
    setLoadingLeaderboard(true);
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/get-leaderboard`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setLeaderboard(res);
        setLoadingLeaderboard(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchLeaderboardErr(true);
      });
  }, []);

  return (
    <>
      {loadingLeaderboard && !fetchLeaderboardErr != false ? (
        <p>Loading Leaderboard...</p>
      ) : null}
      {!leaderboard ? null : (
        <>
        <div className={styles.leaderboardCaption}><a href="https://pixabay.com/users/placidplace-25572496/?utm_source=link-attribution&utm_medium=referral&utm_campaign=animation&utm_content=9582"><img src={fireworksAnimation} alt="fireworks" /></a><p>Top 10 Players of all games</p><a href="https://pixabay.com/users/placidplace-25572496/?utm_source=link-attribution&utm_medium=referral&utm_campaign=animation&utm_content=9582"><img src={fireworksAnimation} alt="fireworks" /></a></div>
        <table>
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Game Name</th>
              <th>Difficulty</th>
              <th>Date Completed</th>
              <th>Time to complete</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard == null
              ? null
              : leaderboard.map((playerRecord, indx) => {
                  return (
                    <tr key={playerRecord.player_id}>
                      <th>{playerRecord.name}</th>
                      <td>{playerRecord.image_name}</td>
                      <td>{capitalizeFirstLetter(playerRecord.difficulty)}</td>
                      <td>{format(playerRecord.end_time, "LLL-d-y")}</td>
                      <td>
                        {parseFloat(playerRecord.difference).toFixed(2)} Seconds
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        </>
      )}
    {fetchLeaderboardErr ? (<p>Something went wrong</p>): null}

    </>
  );
};

export default Leaderboards;
