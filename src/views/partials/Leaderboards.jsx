import { useState, useEffect } from "react";
import { format } from "date-fns";

import styles from "../../styles/Leaderboards.module.css";

const Leaderboards = () => {
  const [leaderboard, setLeaderboard] = useState(null);
  const [leaderboardLimit, setLeaderboardLimit] = useState(10);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/get-leaderboard`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setLeaderboard(res));
  }, []);

  return (
    <>
      <h3 className={styles.leaderboardHeading}>Leaderboard:</h3>
      <div>
      </div>
      <table border={1}>
        <caption>Top 10 of all images</caption>
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
        {leaderboard == null ? null : (
          leaderboard.map((playerRecord, indx) => {
            return (
              <tr key={playerRecord.player_id}>
                <th>{playerRecord.name}</th>
                <td>{playerRecord.image_name}</td>
                <td>{playerRecord.difficulty}</td>
                <td>{format(playerRecord.end_time, 'LLL-d-y')}</td>
                <td>{playerRecord.difference}</td>
              </tr>
            )
          })
        )}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboards;
