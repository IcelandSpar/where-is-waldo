import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SelectMenu from "./SelectMenu.jsx";


const Image = ({ targetOptions, setTargetOptions, styles, waldoItems, setSubmitResultMsg, completedWaldoItems, setCompletedWaldoItems, setWaldoItems, setIsGameWon }) => {
  const [ pointClicked, setPointClicked ] = useState(null);
  
  const { imageId, playerId } = useParams();

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

    const setSubmitMsgToNull = () => {
    const submitMsgTimeout = setTimeout(() => {
      setSubmitResultMsg(null);
    }, 3000)
  };

  const checkIfGameWon = (imageId, playerId) => {
    fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/game/check-if-all-items-found/${imageId}/${playerId}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
      setIsGameWon(res.allItemsFound)
    })
  }

    const submitPointClicked = (e, itemName) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('imageId', imageId);
    formData.append('playerId', playerId);
    formData.append("windowWidth", pointClicked.windowWidth);
    formData.append("windowHeight", pointClicked.windowHeight);
    formData.append("xCoord", pointClicked.xPageCoord);
    formData.append("yCoord", pointClicked.yPageCoord);
    formData.append("itemName", itemName);

    fetch(`http://localhost:3000/game/check-if-correct-coord`, {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.coordResult) {
          if(!completedWaldoItems.find((item) => item.waldo_item_id == res.waldoItemId)) {
            setCompletedWaldoItems([...completedWaldoItems, waldoItems.find((item) => item.waldo_item_id == res.waldoItemId)])
          }
          setSubmitResultMsg({
            isCorrect: true,
            message: 'Correct!',
          })
            fetch(`http://localhost:3000/game/get-player-items/${imageId}/${playerId}`, {
            method: "GET",
            })
            .then((res) => res.json())
            .then((res) => {
            checkIfGameWon(imageId, playerId)
            setWaldoItems(res)
            });

        } else if(!res.coordResult) {
          setSubmitResultMsg({
            isCorrect: false,
            message: 'Wrong. Try again!',
          })

        }
        setSubmitMsgToNull();

        console.log(res.coordResult)
      })
      .catch((err) => console.error(err));
    setPointClicked(null);
  };

  return (
    <>
      <img
        id="gameImage"
        onClick={handleImageClick}
        className={styles.gameImage}
        src={"http://localhost:3000/images/i_spy_10.jpg"}
      ></img>
      {pointClicked == null ? null : (
        <div
          className={styles.circleClicked}
          style={{
            top: `${pointClicked.yPageCoord - targetOptions.targetWidth / 2}px`,
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
              top: "50%",
              left: "50%",
              position: "absolute",
            }}
          ></div>
        </div>
      )}
      {console.log(pointClicked)}
      {pointClicked == null || !targetOptions.isMenuActive ? null : (
        <SelectMenu
          styles={styles}
          targetOptions={targetOptions}
          pointClicked={pointClicked}
          orientDropDownMenu={orientDropDownMenu}
          submitPointClicked={submitPointClicked}
          waldoItems={waldoItems}
        />
      )}
    </>
  );
};

export default Image;
