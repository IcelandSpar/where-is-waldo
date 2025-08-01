import { format } from "date-fns";

import styles from '../../styles/GameLeaderboard.module.css';

const GameLeaderboard = ({leaderboardContent}) => {
  return (
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
  )
};

export default GameLeaderboard;