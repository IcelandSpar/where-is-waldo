import { useState } from 'react';

import searchCheckIcon from '../../assets/search_check_icon.svg';
import searchMysteryIcon from '../../assets/search_mystery_icon.svg';
import menuArrowOpenIcon from '../../assets/arrow_menu_open_icon.svg';
import menuArrowCloseIcon from '../../assets/arrow_menu_close_icon.svg';

import styles from '../../styles/ItemList.module.css';

const ItemList = ({ capitalizeFirstLetter, waldoItems }) => {
  const [ isItemListShown, setIsItemListShown ] = useState(true);

  const handleAsideBtn = (e) => {
    e.preventDefault();
    setIsItemListShown((prev) => !prev)
  }

  return (
    <div className={`${styles.itemListCont} ${isItemListShown ? styles.itemListContVisible : styles.itemListContHide}`}>
      <div className={styles.itemListContRelativeCont}>
        <h3 className={styles.itemListHeading}>Find the Items</h3>
        <button onClick={handleAsideBtn} className={styles.moveAsideBtn}>{isItemListShown ? <img className={styles.itemListIconOpen} alt='Close Item List' src={menuArrowCloseIcon} width={'24px'} height={'24px'}/> : <img className={styles.itemListIconOpen} alt='Open Item List' src={menuArrowOpenIcon} width={'24px'} height={'24px'}/>}</button>
        <ul className={styles.itemListUlCont}>
          {waldoItems == null ? null : (
          waldoItems.map((item, index) => {
            return (
              <li className={styles.itemListLiCont} key={index}>
                <div>{item.is_found ? <img src={searchCheckIcon} alt='item found' width={'24px'} height={'24px'}/>: <img src={searchMysteryIcon} alt='item found' width={'24px'} height={'24px'}/>}</div>
                <p style={{
                  textDecoration: item.is_found ? 'line-through' : 'none',
                }}>{capitalizeFirstLetter(item.item_name)}</p>
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