import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import styles from "../styles/Game.module.css";
import iSpy10 from "../assets/i_spy_10.jpg";

const Game = () => {

  const [pointClicked, setPointClicked] = useState(null);
  const [targetOptions, setTargetOptions] = useState({
    targetWidth: 100,
    targetDotSize: 10,
    targetDotColor: "red",
    reticleColor: "red",
    reticleWidth: 10,
    reticleStyle: "dashed",
  });
  const { difficulty } = useParams();

  useEffect(() => {
    const handleWindowResize = () => {
      const image = document.getElementById('gameImage');
      setPointClicked({
        ...pointClicked,
        xPageCoord: ((image.offsetWidth / pointClicked.windowWidth) * pointClicked.xPageCoord),
        yPageCoord: ((image.offsetHeight / pointClicked.windowHeight) * pointClicked.yPageCoord),
        windowWidth: image.offsetWidth,
        windowHeight: image.offsetHeight,
      })

    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [pointClicked])


  const handleImageClick = (e) => {
    const image = document.getElementById('gameImage');
    setPointClicked({
      xPageCoord: e.pageX,
      yPageCoord: e.pageY,
      windowWidth: image.offsetWidth,
      windowHeight: image.offsetHeight,
    });
  };

  return (
    <>
      <main className={styles.gameMainCont}>
        <img id="gameImage" onClick={handleImageClick} className={styles.gameImage} src={iSpy10}></img>
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
                top: '50%',
                left: '50%',
              }}
            ></div>
          </div>
        )}
      </main>
    </>
  );
};

export default Game;
