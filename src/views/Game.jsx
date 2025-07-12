import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles/Game.module.css";
import iSpy10 from "../assets/i_spy_10.jpg";

const Game = () => {
  const [ windowDimensions, setWindowDimensions ] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [pointClicked, setPointClicked] = useState(null);
  const [targetOptions, setTargetOptions] = useState({
    targetWidth: 500,
    targetDotSize: 50,
    targetDotColor: "white",
    reticleColor: "white",
    reticleWidth: 35,
    reticleStyle: "ridge",
  });
  const { difficulty } = useParams();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])


  const handleImageClick = (e) => {
    console.log(e)
    setPointClicked({
      xPageCoord: e.pageX,
      yPageCoord: e.pageY,
    });
  };

  return (
    <>
      <main className={styles.gameMainCont}>
        {console.log(windowDimensions)}
        <img onClick={handleImageClick} className={styles.gameImage} src={iSpy10}></img>
        {pointClicked == null ? null : (
          <div
            className={styles.circleClicked}
            style={{
              top: `${
                pointClicked.yPageCoord - targetOptions.targetWidth / 2
              }px`,
              left: `${
                pointClicked.xPageCoord - targetOptions.targetWidth / 2
              }px`,
              width: `${targetOptions.targetWidth}px`,
              height: `${targetOptions.targetWidth}px`,
              borderColor: targetOptions.reticleColor,
              borderStyle: targetOptions.reticleStyle,
              borderWidth: targetOptions.reticleWidth,
            }}
          >
            <div
              className={styles.pointClicked}
              style={{
                width: `${targetOptions.targetDotSize}px`,
                height: `${targetOptions.targetDotSize}px`,
                transform: `translateY(-50%) translateX(-50%)`,
                backgroundColor: targetOptions.targetDotColor,
              }}
            ></div>
          </div>
        )}
      </main>
    </>
  );
};

export default Game;
