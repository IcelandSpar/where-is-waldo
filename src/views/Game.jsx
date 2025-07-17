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
    isMenuActive: false,
    menuWidth: 200,
    menuHeight: 200,
    menuFontSize: "1.2rem",
  });
  const { difficulty } = useParams();

  useEffect(() => {
    const handleWindowResize = () => {
      const image = document.getElementById("gameImage");
      setPointClicked({
        ...pointClicked,
        xPageCoord:
          (image.offsetWidth / pointClicked.windowWidth) *
          pointClicked.xPageCoord,
        yPageCoord:
          (image.offsetHeight / pointClicked.windowHeight) *
          pointClicked.yPageCoord,
        windowWidth: image.offsetWidth,
        windowHeight: image.offsetHeight,
      });
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [pointClicked]);

  const orientDropDownMenu = () => {
    let translateX =
      pointClicked.xPageCoord + targetOptions.menuWidth >
      pointClicked.windowWidth
        ? "translateX(-100%)"
        : "";
    let translateY =
      pointClicked.yPageCoord + targetOptions.menuHeight >
      pointClicked.windowHeight
        ? "translateY(-100%)"
        : "";
    return translateX + translateY;
  };

  const handleImageClick = (e) => {
    const image = document.getElementById("gameImage");
    if (targetOptions.isMenuActive) {
      setTargetOptions({
        ...targetOptions,
        isMenuActive: false,
      });
      setPointClicked(null);
    } else {
      setTargetOptions({
        ...targetOptions,
        isMenuActive: true,
      });
      setPointClicked({
        xPageCoord: e.pageX,
        yPageCoord: e.pageY,
        windowWidth: image.offsetWidth,
        windowHeight: image.offsetHeight,
      });
    }
  };

  const submitPointClicked = (e, itemName) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('windowWidth', pointClicked.windowWidth);
    formData.append('windowHeight', pointClicked.windowHeight);
    formData.append('xCoord', pointClicked.xPageCoord);
    formData.append('yCoord', pointClicked.yPageCoord);
    formData.append('itemName', itemName);

    fetch(`http://localhost:3000/game/check-if-correct-coord`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => res.json())
    .then((res) => console.log(res));

}

  return (
    <div className={styles.overflowHiddenCont}>
      <main className={styles.gameMainCont}>
        <img
          id="gameImage"
          onClick={handleImageClick}
          className={styles.gameImage}
          src={'http://localhost:3000/images/i_spy_10.jpg'}
        ></img>
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
                position: "absolute",
              }}
            ></div>
          </div>
        )}
        {pointClicked == null || !targetOptions.isMenuActive ? null : (
          <div
            className={`${styles.clickMenuCont} clickMenuCont`}
            style={{
              backgroundColor: "#1b1b1b",
              top: pointClicked.yPageCoord,
              left: pointClicked.xPageCoord,
              padding: "1rem 1rem",
              borderRadius: "15px",
              width: `${targetOptions.menuWidth}px`,
              height: `${targetOptions.menuHeight}px`,
              overflowY: "auto",
              transform: orientDropDownMenu(),
            }}
          >
            {console.log({
              windowWidth: pointClicked.windowWidth,
              windowHeight: pointClicked.windowHeight,
              xCoord: pointClicked.xPageCoord,
              yCoord: pointClicked.yPageCoord,
            })}
            <ul
              className={styles.clickMenuUl}
              style={{
                listStyleType: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {["", "", "", "", "", "", ""].map((item, indx) => {
                return (
                  <li key={indx} className={styles.clickMenuLi}>
                    <button
                      style={{
                        fontSize: targetOptions.menuFontSize,
                      }}
                      type="button"
                      onClick={(e) => submitPointClicked(e, item)}
                    >
                      Menu Item {indx}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default Game;
