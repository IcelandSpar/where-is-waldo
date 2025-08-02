import styles from '../../styles/OpenLeaderboardBtn.module.css';
import leaderboardIcon from '../../assets/leaderboard.svg';
import minimizeIcon from '../../assets/minimize_icon.svg';

const OpenLeaderboardBtn = ({isLeaderboardOpen}) => {
  return (
        <button
          className={`${styles.checkLeaderboardCont} checkLeaderboardCont`}
        >
          <p className={`${styles.checkLeaderboardText} checkLeaderboardText`}>
            Check out the leaderboard!
          </p>
          <div className={`${styles.openLeaderboardIcon} openLeaderboardIcon`}>
            {!isLeaderboardOpen ? (
              <img
                className={`${styles.leaderboardIcon} leaderboardIcon`}
                src={leaderboardIcon}
                alt="leaderboard"
              />
            ) : (
              <img
                className={`${styles.collapseLeaderboardIcon} leaderboardIcon`}
                src={minimizeIcon}
                alt="close leaderboard table"
              />
            )}
          </div>
        </button>
  )
};

export default OpenLeaderboardBtn;