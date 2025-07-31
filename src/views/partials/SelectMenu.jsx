const SelectMenu = ({ styles, targetOptions, pointClicked, orientDropDownMenu, submitPointClicked, waldoItems }) => {

  return (
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
            <h4 className={styles.menuSelectHeading}>Choose an Item</h4>
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
              { waldoItems.map((item, indx) => {
                if(!item.is_found) {
                return (
                  <li key={indx} className={styles.clickMenuLi}>
                    <button
                      style={{
                        fontSize: targetOptions.menuFontSize,
                      }}
                      type="button"
                      onClick={(e) => submitPointClicked(e, 'shell')}
                    >
                      {item.item_name}
                    </button>
                  </li>
                );
                } else {
                  return null;
                }

              })}
            </ul>
          </div>
  )
};

export default SelectMenu;