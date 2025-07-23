import { useState } from 'react';

import styles from '../../styles/ItemList.module.css';

const ItemList = ({ waldoItems }) => {
  const [ isItemListShown, setIsItemListShown ] = useState(true);

  const handleAsideBtn = (e) => {
    e.preventDefault();
    setIsItemListShown((prev) => !prev)
  }

  return (
    <div className={`${styles.itemListCont} ${isItemListShown ? styles.itemListContVisible : styles.itemListContHide}`}>
      <div className={styles.itemListContRelativeCont}>
        <h3>Items to find:</h3>
        <button onClick={handleAsideBtn} className={styles.moveAsideBtn}>{isItemListShown ? '-' : '+'}</button>
        <ul className={styles.itemListUlCont}>
          {waldoItems == null ? null : (
          waldoItems.map((item, index) => {
            return (
              <li className={styles.itemListIlCont}>
                <div>{item.is_found ? '✔️': 'x'}</div>
                <div>{item.item_name}</div>
              </li>
            )
          })
          )}

        </ul>
      </div>
    </div>
  )
};

export default ItemList;