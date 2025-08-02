import { useEffect, useState } from "react";
import { format } from "date-fns";

import styles from '../../styles/GameLeaderboard.module.css';

const GameLeaderboard = ({image_id, setIsLeaderboardOpen, isLeaderboardOpen}) => {
  const [ leaderboardContent, setLeaderboardContent ] = useState(null);
  const [fetchLeaderboardErr, setFetchLeaderboardErr] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  useEffect(() => {
        setIsLeaderboardOpen((prev) => !prev);
    setFetchLeaderboardErr(false);
    if (isLeaderboardOpen) {
      setIsLeaderboardLoading(true);
      fetch(
        `${import.meta.env.VITE_FETCH_BASE_URL}/game/get-game-leaderboard/${
          image_id
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setLeaderboardContent(() => res)
        })
        .catch((err) => {
          if (err) {
            console.error(err);
            setFetchLeaderboardErr(true);
          }
        })
        .finally(() => setIsLeaderboardLoading(false));


    }
  }, []);



  return (
    <>
    {!isLeaderboardLoading ? null : <p>Loading Leaderboard...</p>}
    {!fetchLeaderboardErr ? null : <p>Something went wrong...</p>}
    {leaderboardContent == null ? null : (
          <table className={styles.gameLeaderboardTable}>
      <thead>
        <tr>
          <th>Player</th>
          <th>Date</th>
          <th>Time Taken</th>
        </tr>
      </thead>
      <tbody>
      {!leaderboardContent ? null : leaderboardContent.map((rowContent, index) => {
        return (
          <tr key={index}>
            <th>{rowContent.name}</th>
            <td>{format(rowContent.end_time, "LLL-d-y")}</td>
            <td>{parseFloat(rowContent.difference).toFixed(2)}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    )}

    </>
  )
};

export default GameLeaderboard;