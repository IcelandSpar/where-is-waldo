import { Link } from "react-router-dom";

import styles from '../styles/Error.module.css';

const Error = () => {
  return (
    <div className={styles.errorCont}>
      <h1 className={styles.errorHeading}>This Page does not exist...</h1>
      <p className={styles.goHomePara}><Link to={'/'} className={styles.goHomeLink}>Go Home</Link></p>
    </div>
  )
};

export default Error;