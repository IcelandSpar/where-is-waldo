import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import styles from '../../styles/GameLeaderboard.module.css';

const GameLeaderboard = ({image_id, setIsLeaderboardOpen, isLeaderboardOpen}) => {
  const [ leaderboardContent, setLeaderboardContent ] = useState(null);
  const [fetchLeaderboardErr, setFetchLeaderboardErr] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  const { playerId } = useParams();

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
      <div className={styles.gameLeaderboardCont}>
          <table className={styles.gameLeaderboardTable}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Date</th>
          <th>Time Taken</th>
        </tr>
      </thead>
      <tbody>
      {!leaderboardContent ? null : leaderboardContent.map((rowContent, index) => {
        return (
          <tr key={index} style={{
            backgroundColor: playerId == rowContent.player_id ? '#24535a' : 'none',
          }}>
            <td>{index + 1}.</td>
            <th style={{
              textDecoration: playerId == rowContent.player_id ? 'underline' : 'none',
            }}>{rowContent.name}</th>
            <td>{format(rowContent.end_time, "LLL-d-y")}</td>
            <td>{parseFloat(rowContent.difference).toFixed(2)} Seconds</td>
          </tr>
        )
      })}
      </tbody>
    </table>
    </div>
    )}

    </>
  )
};

export default GameLeaderboard;