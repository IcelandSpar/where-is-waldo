import { useState } from 'react';

import styles from '../../styles/ItemList.module.css';

const ItemList = () => {
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
          <li className={styles.itemListIlCont}>
            <div>✔️</div>
            <div>Item 1</div>
          </li>
          <li className={styles.itemListIlCont}>
            <div>✔️</div>
            <div>Item 2</div>
          </li>
          <li className={styles.itemListIlCont}>
            <div>✔️</div>
            <div>Item 3</div>
          </li>
          <li className={styles.itemListIlCont}>
            <div>✔️</div>
            <div>Item 4</div>
          </li>
          <li className={styles.itemListIlCont}>
            <div>✔️</div>
            <div>item 5</div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default ItemList;