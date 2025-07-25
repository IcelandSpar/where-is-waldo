import { useEffect, useState, useRef } from "react";
import styles from "../../styles/Timer.module.css";

const Timer = ({ isGameWon }) => {
  const [time, setTime] = useState("00:00:00");
  const timerInt = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      timerInt.current = setInterval(() => {
        const splitTimer = time.split(":");

        const addLeadingZero = (num) => {
          if (num.toString().length <= 1) {
            return "0" + num.toString();
          }
          return num;
        };

        if (parseInt(splitTimer[1]) >= 59 && parseInt(splitTimer[2]) >= 59) {
          setTime((prev) =>
            [addLeadingZero(parseInt(splitTimer[0]) + 1), "00", "00"].join(":")
          );
        } else if (parseInt(splitTimer[2]) >= 59) {
          setTime((prev) =>
            [
              splitTimer[0],
              addLeadingZero(parseInt(splitTimer[1]) + 1),
              "00",
            ].join(":")
          );
        } else {
          setTime((prev) =>
            [
              splitTimer[0],
              splitTimer[1],
              addLeadingZero(parseInt(splitTimer[2]) + 1),
            ].join(":")
          );
        }
      }, 1000);
    };

    if (isGameWon == false) {
      startTimer();
    }

    return () => {
      clearInterval(timerInt.current);
    };
  }, [time, isGameWon]);

  return (
    <div className={styles.timerCont}>
      <p>{time}</p>
    </div>
  );
};

export default Timer;
